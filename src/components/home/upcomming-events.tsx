"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";

type CommunityEvent = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  email: string;
};

function getEventCategory(event: CommunityEvent) {
  const searchText = `${event.type} ${event.title}`.toLowerCase();

  if (searchText.includes("plant") || searchText.includes("tree")) {
    return "Plantation";
  }
  if (
    searchText.includes("winter") ||
    searchText.includes("blanket") ||
    searchText.includes("clothing")
  ) {
    return "Winter Relief";
  }
  if (searchText.includes("cleanup") || searchText.includes("cleaning")) {
    return "Cleanup";
  }
  if (searchText.includes("food") || searchText.includes("meal")) {
    return "Food Drive";
  }
  if (
    searchText.includes("health") ||
    searchText.includes("medical") ||
    searchText.includes("blood")
  ) {
    return "Health Camp";
  }
  if (searchText.includes("education") || searchText.includes("school")) {
    return "Education";
  }
  if (searchText.includes("donation") || searchText.includes("relief")) {
    return "Donation";
  }

  return event.type;
}

function getEventTimestamp(date: string) {
  const timestamp = new Date(`${date}T00:00:00`).getTime();
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

function formatEventDate(date: string) {
  const eventDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(eventDate.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(eventDate);
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`);

        if (!response.ok) {
          throw new Error(`Could not load events (${response.status}).`);
        }

        const eventData: CommunityEvent[] = await response.json();

        if (!Array.isArray(eventData)) {
          throw new Error("The events response is not a list.");
        }

        if (isMounted) {
          const latestEvents = [...eventData]
            .sort(
              (firstEvent, secondEvent) =>
                getEventTimestamp(secondEvent.date) -
                getEventTimestamp(firstEvent.date),
            )
            .slice(0, 6);

          setEvents(latestEvents);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Failed to load events:", error);

        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Could not load events. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f1f8f2] via-[#f8fbf8] to-white px-4 py-16 text-[#17251d] dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 dark:text-white sm:px-6 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-0 z-0 size-[30rem] rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-36 z-0 size-[28rem] rounded-full bg-lime-200/20 blur-3xl dark:bg-lime-500/5"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#087443] ring-1 ring-emerald-700/10 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-white/10">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Your next good thing
            </span>
            <h2
              className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              id="upcoming-events-heading"
            >
              Find your next{" "}
              <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                good thing.
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#68776d] dark:text-neutral-400">
              Find a cause that matters and make a difference in your
              community.
            </p>
          </div>
          <Link
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-emerald-800/10 bg-white/80 px-4 text-sm font-bold text-[#087443] shadow-sm shadow-emerald-950/5 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-emerald-700/30 hover:bg-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078f4c] motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-900/80 dark:text-emerald-300 dark:hover:bg-neutral-800 sm:self-auto"
            href="/event"
          >
            View all events
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {isLoading ? (
          <div
            aria-label="Loading events"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div
                aria-hidden="true"
                className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white p-3 shadow-sm dark:border-white/10 dark:bg-neutral-900"
                key={index}
              >
                <div className="aspect-[16/10] animate-pulse rounded-xl bg-emerald-100 dark:bg-emerald-950" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-emerald-100 dark:bg-emerald-950" />
                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-emerald-50 dark:bg-neutral-800" />
                <div className="mt-5 h-10 animate-pulse rounded-xl bg-emerald-100 dark:bg-emerald-950" />
              </div>
            ))}
            <span className="sr-only">Loading recent events...</span>
          </div>
        ) : errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-white px-6 py-10 text-center shadow-sm dark:border-rose-900 dark:bg-neutral-900"
            role="alert"
          >
            <CircleAlert
              aria-hidden="true"
              className="mx-auto size-8 text-rose-600"
            />
            <h3 className="mt-3 font-bold">Events couldn’t load</h3>
            <p className="mt-2 text-sm text-[#68776d] dark:text-neutral-400">
              {errorMessage}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbd9cf] bg-white/70 px-6 py-14 text-center dark:border-white/15 dark:bg-neutral-900/60">
            <HeartHandshake
              aria-hidden="true"
              className="mx-auto size-8 text-[#078f4c]"
            />
            <h3 className="mt-3 font-bold">No events yet</h3>
            <p className="mt-2 text-sm text-[#68776d] dark:text-neutral-400">
              Check back soon to find ways to help your community.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const category = getEventCategory(event);

              return (
                <article
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#dfe8e1] bg-white/95 shadow-[0_8px_24px_rgba(27,75,47,0.06)] transition duration-300 hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-[0_20px_45px_rgba(27,75,47,0.14)] motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-900 dark:hover:border-emerald-500/30"
                  key={event._id}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#d8efdf] via-[#b7f36b] to-[#078f4c] dark:from-emerald-950 dark:via-emerald-800 dark:to-emerald-600">
                    <div
                      aria-label={event.title}
                      className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      role="img"
                      style={
                        event.imageUrl
                          ? {
                              backgroundImage: `linear-gradient(0deg, rgba(6, 40, 24, 0.62), rgba(6, 40, 24, 0.02) 70%), url("${event.imageUrl}")`,
                            }
                          : undefined
                      }
                    />
                    {!event.imageUrl && (
                      <HeartHandshake
                        aria-hidden="true"
                        className="absolute right-5 top-5 size-8 text-white/80"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-[11px] font-extrabold text-[#087443] shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/85 dark:text-emerald-300">
                      {category}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-neutral-950/75 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      {formatEventDate(event.date)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#078f4c] dark:text-emerald-400">
                      {event.type}
                    </p>
                    <h3 className="mt-1 line-clamp-1 text-lg font-extrabold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-3 flex items-start gap-2 text-xs font-medium text-[#68776d] dark:text-neutral-400">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-[#078f4c]"
                      />
                      <span className="line-clamp-1">
                        {event.location || "Location to be announced"}
                      </span>
                    </p>
                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[#68776d] dark:text-neutral-400">
                      {event.description}
                    </p>

                    <div className="mt-5 border-t border-[#e3ebe5] pt-4 dark:border-white/10">
                      <p className="mb-3 truncate text-xs text-[#68776d] dark:text-neutral-400">
                        Organized by{" "}
                        <span className="font-semibold text-[#17251d] dark:text-neutral-200">
                          {event.email || "Community organizer"}
                        </span>
                      </p>
                      <Link
                        className="group/button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#129f7f] px-4 text-xs font-extrabold text-white shadow-sm transition hover:shadow-lg hover:shadow-emerald-900/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f4c]"
                        href={`/event/${event._id}`}
                      >
                        View event
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform group-hover/button:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
