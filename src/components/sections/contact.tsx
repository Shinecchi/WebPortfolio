"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          // Honeypot: hidden from real users via CSS below; bots that
          // fill every field will trip server-side spam handling.
          company: formData.get("company"),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setErrorMessage(
          result?.error ?? "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-2xl scroll-mt-16 px-6 py-20">
        <h2
          id="contact-heading"
          className="font-mono text-sm font-semibold tracking-wide text-primary uppercase"
        >
          Contact
        </h2>
        <p className="mt-3 text-2xl font-medium text-balance text-foreground">
          Have a role, project, or question in mind? I&apos;d like to hear about it.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-subject">Subject</Label>
            <Input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a bit about what you have in mind..."
              rows={6}
              required
            />
          </div>

          {/* Honeypot field: hidden from sighted and screen reader users,
              but visible to most simple bots that fill in every field. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" className="h-11 px-6" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send message"}
            </Button>
            <p className="text-xs text-muted-foreground" role="status" aria-live="polite">
              {status === "submitting" && "Submitting..."}
              {status === "success" && "Message sent — thanks, I'll get back to you soon."}
              {status === "error" && (errorMessage ?? "Something went wrong. Please try again.")}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
