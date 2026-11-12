"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-[#d7e5da] text-[#17251d] transition-colors hover:bg-[#e8f5ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f4c] dark:border-white/15 dark:text-white dark:hover:bg-white/10 ${className}`}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
