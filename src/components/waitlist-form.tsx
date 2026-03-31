"use client";

import { useState, FormEvent } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", email }),
      });
      setSubmitted(true);
    } catch {
      // silent fail — form stays open for retry
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-body text-sm text-white/50">
        you&apos;re on the list. we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
        className="glass-input rounded-lg px-5 py-3.5 font-body text-sm text-white placeholder-white/30 outline-none focus:border-white/20 w-full sm:w-72"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white px-6 py-3.5 font-body text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "..." : "join"}
      </button>
    </form>
  );
}
