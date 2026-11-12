"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  HandHeart,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

const impactStats = [
  { value: 1450, suffix: "+", label: "Active Volunteers", Icon: UsersRound },
  { value: 180, suffix: "+", label: "Events Completed", Icon: CalendarDays },
  { value: 24000, suffix: "+", label: "Lives Impacted", Icon: HandHeart },
  { value: 100, suffix: "%", label: "Community Driven", Icon: HeartHandshake },
];

export default function ImpactStats() {
  const [counts, setCounts] = useState(() => impactStats.map(() => 0));

  useEffect(() => {
    const section = document.querySelector("[data-impact-stats]");

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let hasStarted = false;
    const duration = 1800;
    const stagger = 120;
    let startTime = 0;

    function animate(timestamp: number) {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const nextCounts = impactStats.map(({ value }, index) => {
        const progress = Math.min(
          Math.max((elapsed - index * stagger) / duration, 0),
          1,
        );
        const easedProgress = 1 - (1 - progress) ** 3;

        return Math.round(value * easedProgress);
      });

      setCounts(nextCounts);

      if (
        nextCounts.some(
          (count, index) => count < impactStats[index].value,
        )
      ) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          observer.disconnect();
          if (reducedMotion) {
            setCounts(impactStats.map(({ value }) => value));
          } else {
            animationFrame = window.requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      aria-label="Togetherly community impact"
      className="relative z-10 -mt-7 overflow-hidden bg-gradient-to-r from-[#e7f5eb] via-[#f2faf4] to-[#e3f4e8] px-4 pb-12 pt-9 dark:from-neutral-950 dark:via-neutral-900 dark:to-emerald-950/40 sm:px-8 sm:pb-14 sm:pt-10"
      data-impact-stats
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 size-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 size-80 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-500/5"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5">
        {impactStats.map(({ value, suffix, label, Icon }, index) => (
          <article
            key={label}
            className="group relative flex min-h-[112px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/90 bg-white/85 px-2 py-4 text-center shadow-[0_8px_24px_rgba(27,75,47,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-[0_16px_34px_rgba(7,143,76,0.14)] motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-900/80 dark:hover:border-emerald-700 dark:hover:bg-neutral-900 sm:min-h-[132px] sm:rounded-3xl sm:py-5"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#00a852]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
            />
            <span className="mb-2 flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-lime-100 text-[#078f4c] transition duration-300 group-hover:scale-110 group-hover:from-[#078f4c] group-hover:to-[#25c45c] group-hover:text-white motion-reduce:transition-none dark:from-emerald-950 dark:to-emerald-900 dark:text-emerald-300 dark:group-hover:from-emerald-700 dark:group-hover:to-green-600 sm:size-9">
              <Icon
                aria-hidden="true"
                className="size-4 sm:size-[18px]"
                strokeWidth={1.8}
              />
            </span>
            <span
              aria-hidden="true"
              className="bg-[image:var(--gradient-brand)] bg-clip-text text-2xl font-extrabold leading-none tracking-tight text-transparent sm:text-3xl"
            >
              {new Intl.NumberFormat("en-US").format(counts[index])}
              {suffix}
            </span>
            <span className="sr-only">
              {new Intl.NumberFormat("en-US").format(value)}
              {suffix} {label}
            </span>
            <span className="mt-1.5 text-xs font-semibold text-[#5b6d61] dark:text-neutral-300 sm:text-sm">
              {label}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
