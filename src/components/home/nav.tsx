"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function NavMenu() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/75 bg-white/80 px-4 text-[#17251d] shadow-sm shadow-emerald-950/5 backdrop-blur-lg dark:border-white/10 dark:bg-neutral-900/75 dark:text-white sm:px-7"
      >
        <Link
          href="/"
          aria-label="Togetherly"
          className="flex min-w-0 items-center gap-2.5 justify-self-start"
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={250}
            height={250}
            className="size-14 shrink-0 object-contain sm:size-16"
            priority
          />
          <span className="hidden flex-col sm:flex">
            <span className="text-[25px] font-extrabold leading-tight tracking-tight text-[#087443] dark:text-emerald-400 sm:text-2xl">
              Togetherly
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#68776d] dark:text-neutral-300">
              Community Action
            </span>
          </span>
        </Link>

        <Link
          href="#upcoming-events"
          className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-center text-xs font-extrabold text-[#078f4c] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[#078f4c] after:to-[#54d878] transition-colors hover:text-[#056b39] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078f4c] dark:text-emerald-400 dark:hover:text-emerald-300 sm:gap-2 sm:px-4 sm:text-sm"
        >
          Upcoming Events
          <CalendarDays aria-hidden="true" className="size-3 shrink-0" />
        </Link>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078f4c] to-[#25c45c] px-4.5 py-3 text-xs font-bold text-white shadow-sm transition-all hover:from-[#067a40] hover:to-[#16a34a] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078f4c] sm:gap-2 sm:px-5 sm:text-sm"
          >
            Login
            <ArrowRight aria-hidden="true" className="size-3.5 sm:size-4" />
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
            className="inline-flex size-12 items-center justify-center rounded-full border border-[#33904a] text-[#17251d] transition-colors hover:bg-[#e8f5ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f4c] dark:border-white/15 dark:text-white dark:hover:bg-white/10 sm:size-10"
          >
            {isDark ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
