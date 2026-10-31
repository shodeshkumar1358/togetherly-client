import {
  CalendarDays,
  MapPinCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Community-led initiatives",
    description:
      "Turn a local idea into action. Create neighborhood cleanups, food drives, and projects that bring people together.",
    Icon: UsersRound,
  },
  {
    number: "02",
    title: "Show up in one click",
    description:
      "Find a cause that matters to you and reserve your spot in seconds. No complicated signup, just meaningful action.",
    Icon: CalendarDays,
  },
  {
    number: "03",
    title: "Organize with confidence",
    description:
      "Keep your initiative on track with simple tools to manage event details, coordinate volunteers, and share updates.",
    Icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Discover what’s next",
    description:
      "Explore upcoming opportunities in your community and find the right time, place, and cause to make a difference.",
    Icon: MapPinCheck,
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative isolate overflow-hidden bg-mint px-5 py-20 text-forest dark:bg-neutral-950 dark:text-white sm:px-8 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-28 -z-10 size-96 rounded-full bg-[var(--fresh-lime)]/20 blur-3xl dark:bg-emerald-950/30"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-dark dark:text-emerald-300 sm:text-sm">
            Made for community impact
          </p>
          <h2
            id="features-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Good things happen{" "}
            <span className="text-primary-dark dark:text-emerald-400">
              together.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)] dark:text-neutral-300 sm:text-base sm:leading-7">
            Everything you need to bring local ideas to life, find your people,
            and make volunteering part of everyday life.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(
            ({
              number,
              title,
              description,
              Icon,
            }) => (
              <article
                key={number}
                className="group relative flex min-h-64 flex-col rounded-3xl border border-border bg-white/90 p-6 shadow-[0_8px_24px_rgba(27,75,47,0.06)] transition duration-300 hover:-translate-y-1 hover:border-primary-dark hover:shadow-[0_18px_40px_rgba(27,75,47,0.12)] dark:bg-neutral-900/85 dark:hover:border-emerald-800 sm:p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span
                    className="flex size-14 items-center justify-center rounded-2xl bg-mint text-[var(--deep-green)] transition duration-300 group-hover:scale-110 group-hover:bg-[var(--primary-hover)] group-hover:text-white dark:bg-emerald-950 dark:text-emerald-300 dark:group-hover:bg-primary-dark"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6 transition-transform duration-300 group-hover:rotate-[-6deg]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#9aaba0] dark:text-neutral-600">
                    {number}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] dark:text-neutral-400">
                  {description}
                </p>
                <div className="mt-auto pt-6">
                  <span
                    aria-hidden="true"
                    className="block h-1 w-10 rounded-full bg-[image:var(--gradient-brand)] transition-all duration-300 group-hover:w-16"
                  />
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
