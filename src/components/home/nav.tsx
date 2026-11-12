"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Menu,
  Moon,
  Sun,
  X,
  LogOut,
  ChevronDown,
  CirclePlus,
  Settings,
  CircleCheck,
} from "lucide-react";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({
  image,
  name,
  size = "size-10",
}: {
  image?: string | null;
  name?: string | null;
  size?: string;
}) {
  const initial = name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <Avatar className={size}>
      <AvatarImage src={image || undefined} alt={name || "User"} />
      <AvatarFallback className="bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}

export default function NavMenu() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Theme Toggle
  function toggleTheme() {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);

    setIsDark(nextIsDark);
  }

  // Logout
  async function handleLogout() {
    try {
      await authClient.signOut();

      setIsProfileOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto max-w-[1200px] rounded-2xl border border-white/75 bg-white/85 text-[#17251d] shadow-sm shadow-emerald-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/85 dark:text-white md:rounded-full">
        {/* Main Navbar */}
        <div className="flex min-h-16 items-center justify-between gap-2 px-3 sm:px-5 md:grid md:min-h-[72px] md:grid-cols-[1fr_auto_1fr] md:px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Togetherly Home"
            className="flex min-w-0 items-center gap-2 md:justify-self-start"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Togetherly Logo"
              width={250}
              height={250}
              className="size-11 shrink-0 object-contain sm:size-12 md:size-14"
              priority
            />

            <span className="flex min-w-0 flex-col">
              <span className="truncate text-lg font-extrabold text-[#087443] dark:text-emerald-400 sm:text-xl md:text-2xl">
                Togetherly
              </span>

              <span className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-[#68776d] dark:text-neutral-300 sm:block">
                Community Action
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Link
            href="/event"
            className="relative hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-extrabold text-[#078f4c] transition-colors hover:text-[#056b39] dark:text-emerald-400 md:flex md:justify-self-center"
          >
            Upcoming Events
            <CalendarDays className="size-4" />
          </Link>

          {/* Right Side */}
          <div className="flex shrink-0 items-center gap-2 md:justify-self-end md:gap-3">
            {/* Desktop Login / Profile */}

            {/* Desktop Profile Section */}
            {isPending ? (
              <div className="hidden size-10 animate-pulse rounded-full bg-gray-200 md:block" />
            ) : !user ? (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full bg-[#078f4c] px-5 py-3 text-sm font-bold text-white md:inline-flex"
              >
                Login
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {/* Profile Dropdown */}
                <div className="relative">
                  {/* Avatar Button */}
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    aria-expanded={isProfileOpen}
                    className="flex items-center gap-2 rounded-full transition hover:opacity-80"
                  >
                    <UserAvatar image={user.image} name={user.name} size="size-10" />

                    <ChevronDown
                      className={`size-4 text-emerald-600 transition-transform ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <>
                      <button
                        type="button"
                        aria-label="Close dropdown"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsProfileOpen(false)}
                      />

                      <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900">
                        {/* User Information */}
                        <div className="border-b border-[#e3eaf1] px-4 py-3 dark:border-white/10">
                          <p className="text-sm font-bold text-[#172033] dark:text-white">
                            {user.name || "User"}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-[#718096] dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Links */}
                        <div className="space-y-0.5 p-2">
                          {/* Create Event */}
                          <Link
                            href="/event/create"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#172033] transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                          >
                            <CirclePlus className="size-4 text-[#00b89c]" />
                            Create Event
                          </Link>

                          {/* Manage Events */}
                          <Link
                            href="/event/manage"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#172033] transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                          >
                            <Settings className="size-4 text-[#8170ff]" />
                            Manage Events
                          </Link>

                          {/* Joined Events */}
                          <Link
                            href="/event/joined"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#172033] transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                          >
                            <CircleCheck className="size-4 text-[#00b89c]" />
                            Joined Events
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-[#e3eaf1] p-2 dark:border-white/10">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <LogOut className="size-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Separate Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden items-center gap-2 rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50 sm:flex dark:border-white/10 dark:hover:bg-red-500/10"
                >
                  <LogOut className="size-3.5" />
                  Logout
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              aria-pressed={isDark}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[#d7e5da] text-[#17251d] transition-colors hover:bg-[#e8f5ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f4c] dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-emerald-50 text-[#087443] transition-colors hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 md:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="grid gap-2 border-t border-emerald-900/10 px-3 pb-3 pt-3 dark:border-white/10 sm:px-5 md:hidden"
          >
            {/* Events */}
            <Link
              href="/event"
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-bold text-[#087443] transition-colors hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/5"
            >
              <span>Upcoming Events</span>
              <CalendarDays className="size-4" />
            </Link>

            {/* Mobile Login / Profile */}
            {isPending ? (
              <div className="h-12 animate-pulse rounded-xl bg-emerald-50 dark:bg-white/5" />
            ) : !user ? (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#25c45c] px-4 text-sm font-bold text-white"
              >
                Login
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-3 dark:bg-white/5">
                <div className="flex min-w-0 items-center gap-3">
                  <UserAvatar image={user.image} name={user.name} size="size-11" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {user.name || "User"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="rounded-full p-2 text-red-500 transition hover:bg-red-100 dark:hover:bg-red-950/30"
                >
                  <LogOut className="size-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
