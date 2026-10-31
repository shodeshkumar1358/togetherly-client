import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Globe2,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";

const platformLinks = [
  { label: "Upcoming Events", href: "#upcoming-events", Icon: CalendarDays },
  { label: "Create an Event", href: "/login", Icon: Sparkles },
  { label: "Explore Features", href: "#features-heading" },
  { label: "Get Community Updates", href: "#subscribe-heading" },
];

const causes = [
  "Winter Clothes & Blanket Relief",
  "City Clean-up & Waste Reduction",
  "Urban Tree Planting Drives",
  "Community Meal Sharing",
  "Health & Wellness Camps",
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-mint text-forest dark:border-white/10 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1.2fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt=""
                width={58}
                height={58}
                className="size-12 rounded-xl object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-primary-dark dark:text-emerald-400">
                Togetherly
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--text-secondary)] dark:text-neutral-400">
              A community-powered platform helping people create, join, and grow
              meaningful local volunteer initiatives.
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] dark:text-neutral-400">
              <MapPin
                aria-hidden="true"
                className="size-4 shrink-0 text-primary-dark dark:text-emerald-400"
              />
              Dhaka, Bangladesh · Community everywhere
            </p>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">
              Explore Togetherly
            </h2>
            <ul className="mt-5 space-y-3">
              {platformLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-neutral-400 dark:hover:text-emerald-300"
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        className="size-4 text-primary transition-transform group-hover:scale-110 dark:text-emerald-400"
                      />
                    ) : null}
                    {label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">
              Causes to care about
            </h2>
            <ul className="mt-5 space-y-3">
              {causes.map((cause, index) => (
                <li key={cause} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      index % 2 === 0
                        ? "bg-primary"
                        : "bg-[var(--fresh-lime)] ring-1 ring-primary/40"
                    }`}
                  />
                  <Link
                    href="#upcoming-events"
                    className="text-sm leading-5 text-[var(--text-secondary)] transition-colors hover:text-primary-dark dark:text-neutral-400 dark:hover:text-emerald-300"
                  >
                    {cause}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">
              Community spirit
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)] dark:text-neutral-400">
              Every small action counts. Connect with local volunteers, turn
              compassion into community action, and help make tomorrow better.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-xs font-bold text-primary-dark shadow-sm dark:bg-white/10 dark:text-emerald-300">
              <Globe2 aria-hidden="true" className="size-4" />
              100% Community Driven
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-xs text-[var(--text-secondary)] dark:border-white/10 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Togetherly. Built with care for
            community and a better tomorrow.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Made with
            <Heart
              aria-label="love"
              className="size-3.5 fill-primary text-primary"
            />
            for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
