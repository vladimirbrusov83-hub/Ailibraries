"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqzoyoq";

const SUBJECTS = [
  "Question about the curriculum",
  "Speaking or workshop inquiry",
  "Collaboration or partnership",
  "Feedback",
  "Other",
];

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 text-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#E1F5EE" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="#0F6E56" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="font-semibold text-stone-900 mb-1">Message sent.</p>
        <p className="text-sm text-stone-500">Thanks for reaching out - we&apos;ll get back to you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium text-stone-700 mb-1.5">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="field-refined w-full px-4 py-4 rounded-xl border border-stone-200 bg-white text-base text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-transparent"
          style={{ "--tw-ring-color": "#0F6E56" } as React.CSSProperties}
        />
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-medium text-stone-700 mb-1.5">
          Subject
        </label>
        <select
          id="cf-subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="field-refined w-full px-4 py-4 rounded-xl border border-stone-200 text-base text-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-transparent bg-white"
          style={{ "--tw-ring-color": "#0F6E56" } as React.CSSProperties}
        >
          <option value="" disabled>Select a subject…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-stone-700 mb-1.5">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message…"
          className="field-refined w-full px-4 py-4 rounded-xl border border-stone-200 bg-white text-base text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-transparent resize-none"
          style={{ "--tw-ring-color": "#0F6E56" } as React.CSSProperties}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="send-refined w-full py-4 px-6 rounded-xl text-base font-semibold text-white disabled:opacity-60"
        style={{ backgroundColor: "#0F6E56" }}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
