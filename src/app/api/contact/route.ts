import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Contact form API route
//
// Required env vars (see .env.example):
//   RESEND_API_KEY   - API key for https://resend.com. When present, this
//                       route sends the message via the Resend HTTP API.
//   CONTACT_TO_EMAIL - The mailbox that should receive contact submissions.
//   CONTACT_FROM_EMAIL - The "from" address used when sending via Resend.
//                       Must be a verified sender/domain in Resend.
//
// If RESEND_API_KEY (or CONTACT_TO_EMAIL) is not set, the route falls back
// to logging the submission server-side and returning success. This keeps
// local development working without any provider configured, while the
// "real" send path (calling Resend) is what runs once the env vars are
// filled in (e.g. in production).
// ---------------------------------------------------------------------------

const RESEND_API_URL = "https://api.resend.com/emails";

const NAME_MAX_LENGTH = 120;
const EMAIL_MAX_LENGTH = 254;
const SUBJECT_MAX_LENGTH = 200;
const MESSAGE_MAX_LENGTH = 5000;
const MESSAGE_MIN_LENGTH = 10;

// Very small, deliberately permissive email format check. Not a full RFC
// 5322 validator - just enough to catch obviously malformed input.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot field: real users never fill this in (it's hidden from view
  // in the form). Bots that blindly fill every input will trip it.
  company?: string;
}

type FieldErrors = Partial<Record<keyof Omit<ContactPayload, "company">, string>>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(body: unknown): { data?: ContactPayload; errors?: FieldErrors } {
  if (typeof body !== "object" || body === null) {
    return { errors: { name: "Invalid request body" } };
  }

  const { name, email, subject, message, company } = body as Record<string, unknown>;
  const errors: FieldErrors = {};

  if (!isNonEmptyString(name)) {
    errors.name = "Name is required.";
  } else if (name.trim().length > NAME_MAX_LENGTH) {
    errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }

  if (!isNonEmptyString(email)) {
    errors.email = "Email is required.";
  } else if (email.trim().length > EMAIL_MAX_LENGTH) {
    errors.email = `Email must be ${EMAIL_MAX_LENGTH} characters or fewer.`;
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!isNonEmptyString(subject)) {
    errors.subject = "Subject is required.";
  } else if (subject.trim().length > SUBJECT_MAX_LENGTH) {
    errors.subject = `Subject must be ${SUBJECT_MAX_LENGTH} characters or fewer.`;
  }

  if (!isNonEmptyString(message)) {
    errors.message = "Message is required.";
  } else if (message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.trim().length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      name: (name as string).trim(),
      email: (email as string).trim(),
      subject: (subject as string).trim(),
      message: (message as string).trim(),
      // A non-empty, non-string `company` (e.g. an object/array sent by a
      // script hitting the API directly, bypassing the real <form>) is
      // itself suspicious - treat it as a tripped honeypot rather than
      // silently discarding it and skipping the check.
      company:
        company === undefined || company === null
          ? undefined
          : typeof company === "string"
            ? company
            : "non-string-value",
    },
  };
}

// ---------------------------------------------------------------------------
// Extremely simple in-memory rate limiting.
//
// NOTE: this only works within a single running server instance/process. On
// serverless platforms (e.g. Vercel) each invocation may get a fresh module
// scope, and with multiple instances this map isn't shared, so it's a
// best-effort deterrent rather than a real guarantee. That's an acceptable
// tradeoff for a low-traffic portfolio contact form; if abuse becomes a real
// problem, swap this for a shared store (e.g. Upstash Redis) or a hosted
// service (e.g. Cloudflare Turnstile / Vercel WAF rate limiting).
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
// Prune stale keys every so often so long-running processes don't
// accumulate an ever-growing map of one-off visitors.
const PRUNE_INTERVAL_MS = 10 * 60_000;
const submissionLog = new Map<string, number[]>();
let lastPruneAt = Date.now();

function pruneStaleEntries(now: number): void {
  if (now - lastPruneAt < PRUNE_INTERVAL_MS) return;
  lastPruneAt = now;
  for (const [key, timestamps] of submissionLog) {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) {
      submissionLog.delete(key);
    } else {
      submissionLog.set(key, fresh);
    }
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneStaleEntries(now);

  const timestamps = (submissionLog.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return false;
}

function getClientKey(request: NextRequest): string {
  // Behind most proxies/hosts, x-forwarded-for carries the original client
  // IP. Fall back to a constant key if it's unavailable (e.g. local dev),
  // which just means all local requests share one bucket.
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

async function sendViaResend(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact Form <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    // Dev fallback: no provider configured. Log so the submission isn't
    // silently lost during local development, and treat it as a success so
    // the UI flow can still be exercised end-to-end.
    console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set - logging submission instead of sending email:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    return;
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `[Portfolio Contact] ${data.subject}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API error (${response.status}): ${body}`);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const { data, errors } = validate(body);

  if (!data || errors) {
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  // Honeypot: if this hidden field has anything in it, silently report
  // success without actually sending, so bots don't learn to avoid it.
  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    await sendViaResend(data);
  } catch (error) {
    console.error("[contact] Failed to send message:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while sending your message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
