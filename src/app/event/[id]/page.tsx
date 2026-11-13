import EventActionBtn from "@/components/EventAction";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Link from "next/link";

type EventDetails = {
  date: string;
  title: string;
  location: string;
  description: string;
  type: string;
  imageUrl?: string;
  organizerName?: string;
  email?: string;
  guidelines?: string[];
  organizerImage?: string;
};

const EventsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-background px-4 pb-16 pt-28 text-foreground sm:pt-32">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Event not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This event may have been removed or the link may be incorrect.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            href="/event"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Browse events
          </Link>
        </div>
      </main>
    );
  }

  const event: EventDetails = await res.json();
  const parsedDate = new Date(`${event.date}T00:00:00`);
  const formattedDate = Number.isNaN(parsedDate.getTime())
    ? "Date to be announced"
    : new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(parsedDate);
  const organizerName = event.organizerName || "Event Organizer";
  const organizerEmail = event.email || "No email available";
  const guidelines = event.guidelines || [
    "Please arrive 15 minutes before the scheduled time at the designated location.",
    "Wear comfortable clothing suitable for the activity.",
    "Bring any pre-coordinated supplies if requested by the organizer.",
  ];
  const initials =
    organizerName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "EO";

  return (
    <main
      data-event-details
      className="min-h-[65vh] bg-background px-4 pb-16 pt-28 text-foreground sm:px-6 sm:pt-32"
    >
      <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(6,78,53,0.1)]">
        <div
          className="relative flex min-h-72 items-end bg-gradient-to-br from-forest via-deep-green to-primary-dark bg-cover bg-center sm:min-h-96"
          style={
            event.imageUrl
              ? {
                  backgroundImage: `linear-gradient(0deg, rgba(6,40,24,.88), rgba(6,40,24,.08) 80%), url("${event.imageUrl}")`,
                }
              : undefined
          }
        >
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md">
              <Tag aria-hidden="true" className="size-3.5 text-emerald-300" />
              {event.type}
            </span>
          </div>

          <div className="relative w-full p-5 text-white sm:p-8">
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
              <p className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-emerald-300" />
                {event.location}
              </p>
              <p className="inline-flex items-center gap-2">
                <CalendarDays
                  aria-hidden="true"
                  className="size-4 text-emerald-300"
                />
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <EventActionBtn EventDetails={event} />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-8">
              <section aria-labelledby="event-about-heading">
                <h2
                  className="text-xl font-extrabold tracking-tight"
                  id="event-about-heading"
                >
                  About this event
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {event.description}
                </p>
              </section>

              <section
                aria-labelledby="event-guidelines-heading"
                className="border-t border-border pt-7"
              >
                <h2
                  className="text-sm font-extrabold uppercase tracking-[0.12em] text-muted-foreground"
                  id="event-guidelines-heading"
                >
                  Volunteer guidelines
                </h2>
                <ul className="mt-4 space-y-3">
                  {guidelines.map((guideline, index) => (
                    <li
                      className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                      key={`${index}-${guideline}`}
                    >
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                      {guideline}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside>
              <section
                aria-labelledby="event-organizer-heading"
                className="rounded-2xl border border-border bg-background p-5"
              >
                <h2
                  className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground"
                  id="event-organizer-heading"
                >
                  Event organizer
                </h2>
                <div className="mt-5 flex items-center gap-3">
                  {event.organizerImage ? (
                    <div
                      aria-label={organizerName}
                      className="size-12 shrink-0 rounded-full bg-cover bg-center"
                      role="img"
                      style={{
                        backgroundImage: `url("${event.organizerImage}")`,
                      }}
                    />
                  ) : (
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint font-bold text-forest">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{organizerName}</p>
                    <a
                      className="mt-1 flex items-start gap-1.5 break-all text-xs text-muted-foreground transition hover:text-primary"
                      href={event.email ? `mailto:${event.email}` : undefined}
                    >
                      <Mail aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                      {organizerEmail}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  Community organizer
                </div>
              </section>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
};

export default EventsDetailsPage;
