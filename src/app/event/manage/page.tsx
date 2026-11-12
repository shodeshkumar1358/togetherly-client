import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  CirclePlus,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react";

type ManagedEvent = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  email: string;
  organizerName?: string;
};

function isManagedEvent(value: unknown): value is ManagedEvent {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "title" in value &&
    typeof value.title === "string" &&
    "type" in value &&
    typeof value.type === "string" &&
    "date" in value &&
    typeof value.date === "string" &&
    "location" in value &&
    typeof value.location === "string" &&
    "imageUrl" in value &&
    typeof value.imageUrl === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "email" in value &&
    typeof value.email === "string"
  );
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

function EventListError({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl border border-rose-200 bg-white px-6 py-10 text-center shadow-sm dark:border-rose-900 dark:bg-neutral-900"
      role="alert"
    >
      <CircleAlert
        aria-hidden="true"
        className="mx-auto size-8 text-rose-600"
      />
      <h2 className="mt-3 font-bold">Your events couldn’t load</h2>
      <p className="mt-2 text-sm text-[#68776d] dark:text-neutral-400">
        {message}
      </p>
    </div>
  );
}

export default async function ManageEventPage() {
  let events: ManagedEvent[] = [];
  let errorMessage = "";

  try {
    const response = await fetch("http://localhost:5000/event/manage", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Could not load your events (${response.status}).`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || !data.every(isManagedEvent)) {
      throw new Error("The managed events response has an invalid format.");
    }

    events = data;
  } catch (error) {
    console.error("Failed to load managed events:", error);
    errorMessage =
      error instanceof Error
        ? error.message
        : "Please try again in a moment.";
  }

  return (
    <main className="min-h-screen bg-[#f0f6f2] px-4 pb-16 pt-28 text-[#17251d] dark:bg-neutral-950 dark:text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section
          aria-labelledby="manage-events-heading"
          className="flex flex-col gap-5 border-b border-[#dce7df] pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-300">
              <UserRound aria-hidden="true" className="size-3.5" />
              Organizer Dashboard
            </span>
            <h1
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              id="manage-events-heading"
            >
              Manage My Events
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#68776d] dark:text-neutral-400">
              View and manage the social drives you have published. Only your
              events are shown here.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0b9a8d] px-5 text-sm font-bold text-white shadow-md shadow-teal-900/15 transition hover:bg-[#07877d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087c73]"
            href="/event/create"
          >
            <CirclePlus aria-hidden="true" className="size-4" />
            Create New Event
          </Link>
        </section>

        <section aria-label="Your published events" className="pt-7">
          {errorMessage ? (
            <EventListError message={errorMessage} />
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cbd9cf] bg-white/70 px-6 py-14 text-center dark:border-white/15 dark:bg-neutral-900/60">
              <CalendarDays
                aria-hidden="true"
                className="mx-auto size-9 text-[#078f4c]"
              />
              <h2 className="mt-3 font-bold">You haven’t created any events yet</h2>
              <p className="mt-2 text-sm text-[#68776d] dark:text-neutral-400">
                Create a community event and it will appear here.
              </p>
              <Link
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#25c45c] px-4 text-sm font-bold text-white"
                href="/event/create"
              >
                Create an event
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#dfe8e1] bg-white shadow-[0_8px_24px_rgba(27,75,47,0.06)] dark:border-white/10 dark:bg-neutral-900"
                  key={event._id}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#d8efdf] via-[#b7f36b] to-[#078f4c] dark:from-emerald-950 dark:via-emerald-800 dark:to-emerald-600">
                    {event.imageUrl ? (
                      <div
                        aria-label={event.title}
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        role="img"
                        style={{
                          backgroundImage: `linear-gradient(0deg, rgba(6,40,24,.65), rgba(6,40,24,.02) 70%), url("${event.imageUrl}")`,
                        }}
                      />
                    ) : null}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-neutral-950/75 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur">
                      <Tag aria-hidden="true" className="size-3" />
                      {event.type}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-neutral-950/75 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                      <CalendarDays aria-hidden="true" className="size-3.5 text-[#00c853]" />
                      {formatEventDate(event.date)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="line-clamp-1 text-base font-extrabold tracking-tight">
                      {event.title}
                    </h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#68776d] dark:text-neutral-400">
                      <MapPin
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-[#078f9a]"
                      />
                      <span className="truncate">
                        {event.location || "Location to be announced"}
                      </span>
                    </p>
                    <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-5 text-[#68776d] dark:text-neutral-400">
                      {event.description}
                    </p>
                    <div className="mt-3 border-t border-[#e3ebe5] pt-3 dark:border-white/10">
                      <p className="truncate text-[11px] text-[#68776d] dark:text-neutral-400">
                        <span className="font-semibold text-[#17251d] dark:text-neutral-200">
                          {event.organizerName || event.email || "Organizer"}
                        </span>
                      </p>
                    </div>
                    <Link
                      className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#f0f4f8] px-4 text-xs font-bold text-[#17251d] transition hover:bg-[#e5ebf1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f4c] dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                      href={`/event/${encodeURIComponent(event._id)}`}
                    >
                      View Event
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
