"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, BellRing, Check, Mail, Sparkles } from "lucide-react";

export default function SubscribeSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="subscribe-heading"
      className="relative isolate overflow-hidden bg-mint px-5 py-16 text-forest dark:bg-neutral-950 dark:text-white sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest text-white shadow-[0_24px_70px_rgba(6,78,53,0.2)] sm:rounded-[2.5rem]">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 -z-0 size-96 rounded-full bg-[var(--primary)]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-48 left-1/3 -z-0 size-96 rounded-full bg-[var(--fresh-lime)]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute right-8 top-8 hidden size-40 rounded-full border border-white/10 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute right-16 top-16 hidden size-24 rounded-full border border-white/10 sm:block"
          />

          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16">
            <div className="max-w-xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--fresh-lime)]">
                <Sparkles aria-hidden="true" className="size-3.5 text-[var(--primary)]" />
                A little good in your inbox
              </span>
              <h2
                id="subscribe-heading"
                className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                Your next chance to{" "}
                <span className="text-[var(--fresh-lime)]">make a difference.</span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--mint)]/85 sm:text-base sm:leading-7">
                Get occasional updates about upcoming volunteer events and
                meaningful ways to support your local community.
              </p>

              <div className="mt-7 flex items-center gap-3 text-xs font-medium text-[var(--mint)]/85 sm:text-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                  <BellRing aria-hidden="true" className="size-4" />
                </span>
                Only the good stuff. Unsubscribe whenever you like.
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-4 shadow-xl shadow-black/10 backdrop-blur-md sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--fresh-lime)]/15 text-[var(--fresh-lime)]">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold">Stay in the loop</h3>
                  <p className="mt-0.5 text-xs text-[var(--mint)]/75 sm:text-sm">
                    Community opportunities, delivered.
                  </p>
                </div>
              </div>

              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={handleSubmit}
              >
                <label className="sr-only" htmlFor="subscribe-email">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-forest outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--fresh-lime)] focus:ring-4 focus:ring-[var(--fresh-lime)]/20"
                  id="subscribe-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
                <button
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-5 text-sm font-extrabold text-forest shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fresh-lime)] active:translate-y-0"
                  type="submit"
                >
                  Get updates
                  {submitted ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </button>
              </form>

              <p aria-live="polite" className="mt-4 min-h-5 text-xs text-[var(--mint)]/80">
                {submitted
                  ? "Thanks for your interest — local cause alerts are coming soon."
                  : "No spam. We’ll only send updates worth opening."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
