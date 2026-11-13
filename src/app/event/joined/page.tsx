import { auth } from "@/lib/auth";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

type JoinedEvent = {
  _id: string;
  title: string;
  date: string;
  location: string;
  type: string;
};

function isJoinedEvent(value: unknown): value is JoinedEvent {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "title" in value &&
    typeof value.title === "string" &&
    "date" in value &&
    typeof value.date === "string" &&
    "location" in value &&
    typeof value.location === "string" &&
    "type" in value &&
    typeof value.type === "string"
  );
}

const JoinedEventsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  let events: JoinedEvent[] = [];
  let errorMessage = "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/join/${encodeURIComponent(session.user.email)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Could not load your joined events (${response.status}).`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || !data.every(isJoinedEvent)) {
      throw new Error("The joined events response has an invalid format.");
    }

    events = data;
  } catch (error) {
    console.error("Failed to load joined events:", error);
    errorMessage =
      error instanceof Error ? error.message : "Please try again in a moment.";
  }

  return (
    <main className="min-h-[65vh] bg-background px-4 pb-16 pt-28 text-foreground sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-border pb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
            Your community activity
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Events I&apos;ve joined
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Keep track of the local initiatives you&apos;re helping make happen.
          </p>
        </header>

        <section aria-label="Joined events" className="pt-7">
          {errorMessage ? (
            <div
              className="rounded-2xl border border-red-200 bg-card px-6 py-10 text-center shadow-sm"
              role="alert"
            >
              <h2 className="font-bold">Your joined events couldn&apos;t load</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {errorMessage}
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-sm">
              <Search aria-hidden="true" className="mx-auto size-9 text-primary" />
              <h2 className="mt-4 text-lg font-extrabold">
                Your next good thing is out there
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                You haven&apos;t joined an event yet. Browse local opportunities
                and find a cause that matters to you.
              </p>
              <Link
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                href="/event"
              >
                Explore events
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  key={event._id}
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                    {event.type}
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold">{event.title}</h2>
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    {event.date}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    {event.location}
                  </p>
                  <Link
                    className="mt-5 inline-flex text-sm font-bold text-primary hover:underline"
                    href={`/event/${encodeURIComponent(event._id)}`}
                  >
                    View event
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default JoinedEventsPage;
