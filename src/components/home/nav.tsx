"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Menu,
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
import ThemeToggle from "@/components/theme-toggle";

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
    <Avatar className={`${size} ring-2 ring-background shadow-sm`}>
      <AvatarImage src={image || undefined} alt={name || "User"} />
      <AvatarFallback className="bg-gradient-to-br from-emerald-100 via-emerald-50 to-lime-100 font-extrabold text-primary-dark dark:from-emerald-900 dark:via-emerald-950 dark:to-neutral-900 dark:text-emerald-300">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}

export default function NavMenu() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
            className="flex min-w-0 items-center gap-2 md:justify-self-start dark:-ml-2 dark:rounded-full dark:bg-black dark:px-3 dark:py-1"
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
              <div className="flex flex-col items-center gap-1.5">
                {/* Profile Dropdown */}
                <div className="relative">
                  {/* Avatar Button */}
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    aria-expanded={isProfileOpen}
                    aria-controls="profile-menu"
                    aria-label={`${user.name || "User"} profile menu`}
                    className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 py-1 pl-1 pr-2 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-neutral-800/80 dark:hover:border-emerald-700 dark:hover:bg-neutral-800"
                  >
                    <UserAvatar image={user.image} name={user.name} size="size-10" />

                    <span className="hidden max-w-28 truncate text-xs font-extrabold tracking-tight text-[#064e35] sm:block dark:text-emerald-100">
                      {user.name || "User"}
                    </span>

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

                      <div
                        id="profile-menu"
                        className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                      >
                        {/* User Information */}
                        <div className="border-b border-border bg-mint/60 px-4 py-3 dark:bg-emerald-950/40">
                          <p className="text-sm font-extrabold text-forest dark:text-emerald-100">
                            {user.name || "User"}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Links */}
                        <div className="space-y-0.5 p-2">
                          {/* Create Event */}
                          <Link
                            href="/event/create"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground transition hover:bg-mint dark:hover:bg-emerald-950/60"
                          >
                            <CirclePlus className="size-4 text-primary" />
                            Create Event
                          </Link>

                          {/* Manage Events */}
                          <Link
                            href="/event/manage"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground transition hover:bg-mint dark:hover:bg-emerald-950/60"
                          >
                            <Settings className="size-4 text-primary" />
                            Manage Events
                          </Link>

                          {/* Joined Events */}
                          <Link
                            href="/event/joined"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground transition hover:bg-mint dark:hover:bg-emerald-950/60"
                          >
                            <CircleCheck className="size-4 text-primary" />
                            Joined Events
                          </Link>
                        </div>

                        <div className="border-t border-border p-2">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex min-h-10 w-full items-center gap-3 rounded-lg bg-red-50 px-3 py-2.5 text-[13px] font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
                          >
                            <LogOut className="size-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

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
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-white/10 dark:bg-emerald-950/40">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  aria-expanded={isProfileOpen}
                  aria-controls="mobile-profile-menu"
                  aria-label={`${user.name || "User"} profile menu`}
                  className="flex w-full items-center gap-3 rounded-lg p-1 text-left"
                >
                  <UserAvatar image={user.image} name={user.name} size="size-12" />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold tracking-tight text-forest dark:text-emerald-100">
                      {user.name || "User"}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </span>

                  <ChevronDown
                    className={`size-4 shrink-0 text-primary transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div
                    id="mobile-profile-menu"
                    className="mt-3 border-t border-emerald-200 pt-3 dark:border-white/10"
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-10 w-full items-center gap-3 rounded-lg bg-red-50 px-3 py-2.5 text-[13px] font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
