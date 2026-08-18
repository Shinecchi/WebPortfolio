"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoCloseOutline,
  IoLocationOutline,
  IoMailOutline,
  IoMenuOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconBox } from "@/components/icon-box";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/content/site-content";

const socialLinks = [
  { href: personal.githubUrl, label: "GitHub", Icon: GithubIcon },
  { href: personal.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
];

// Accent motion moment (1 of 2 allowed): a slowly rotating conic-gradient
// ring behind the profile avatar, evoking Aceternity's "glowing border"
// pattern without depending on an animation library. Respects
// prefers-reduced-motion via the motion-reduce: variant.
function ProfileAvatar() {
  return (
    <div className="relative mx-auto size-24 shrink-0 lg:mx-0">
      <div
        aria-hidden="true"
        className="absolute inset-[-3px] rounded-full bg-[conic-gradient(from_0deg,var(--primary),transparent_55%,var(--primary))] opacity-70 animate-spin [animation-duration:7s] motion-reduce:animate-none"
      />
      <Avatar className="relative size-24 border-2 border-background">
        <AvatarImage
          src={personal.avatarImage}
          alt={`Portrait of ${personal.name}`}
        />
        <AvatarFallback className="text-lg">
          {personal.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function ContactList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li className="flex items-center gap-4">
        <IconBox>
          <IoMailOutline color="currentColor" size="18px" />
        </IconBox>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Email
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="text-sm break-all text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {personal.email}
          </a>
        </div>
      </li>
      <li className="flex items-center gap-4">
        <IconBox>
          <IoPhonePortraitOutline color="currentColor" size="18px" />
        </IconBox>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Phone
          </p>
          <p className="text-sm text-foreground">{personal.phone}</p>
        </div>
      </li>
      <li className="flex items-center gap-4">
        <IconBox>
          <IoLocationOutline color="currentColor" size="18px" />
        </IconBox>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Location
          </p>
          <p className="text-sm text-foreground">{personal.location}</p>
        </div>
      </li>
    </ul>
  );
}

function SocialList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socialLinks.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProfileInfo() {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
      <ProfileAvatar />
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {personal.name}
        </h1>
        <p className="mt-1 font-mono text-sm text-primary">{personal.role}</p>
      </div>

      <div className="h-px w-full bg-border" aria-hidden="true" />

      <ContactList className="flex w-full flex-col gap-4" />

      <div className="h-px w-full bg-border" aria-hidden="true" />

      <SocialList className="flex items-center gap-2" />
    </div>
  );
}

/**
 * Persistent profile sidebar (structural pattern borrowed from vCard-style
 * portfolios): avatar, name, role, and a contact list that's always visible
 * on large screens. On small screens it collapses into a compact top bar
 * with a toggle that reveals the same information as an off-canvas panel.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstName = personal.name.split(" ")[0];

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* Mobile compact top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={personal.avatarImage}
              alt=""
              aria-hidden="true"
            />
            <AvatarFallback>{firstName[0]}</AvatarFallback>
          </Avatar>
          {firstName}
          <span className="text-primary">.dev</span>
        </a>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="sidebar-drawer"
            aria-label={open ? "Close profile panel" : "Open profile panel"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <IoCloseOutline color="currentColor" />
            ) : (
              <IoMenuOutline color="currentColor" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile off-canvas drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Profile and contact information"
          id="sidebar-drawer"
        >
          <button
            type="button"
            aria-label="Close profile panel"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col gap-6 overflow-y-auto border-l border-border bg-card px-6 py-8">
            <Button
              ref={closeRef}
              variant="ghost"
              size="icon"
              aria-label="Close profile panel"
              className="self-end"
              onClick={() => setOpen(false)}
            >
              <IoCloseOutline color="currentColor" />
            </Button>
            <ProfileInfo />
          </div>
        </div>
      )}

      {/* Desktop persistent sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-border px-6 py-10 lg:flex xl:w-80">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        <ProfileInfo />
      </aside>
    </>
  );
}
