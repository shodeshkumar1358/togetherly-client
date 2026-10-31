import {
  CalendarDays,
  HandHeart,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

const impactStats = [
  { value: "1,450+", label: "Active Volunteers", Icon: UsersRound },
  { value: "180+", label: "Events Completed", Icon: CalendarDays },
  { value: "24,000+", label: "Lives Impacted", Icon: HandHeart },
  { value: "100%", label: "Community Driven", Icon: HeartHandshake },
];

export default function ImpactStats() {
  return (
    <section
      aria-label="Togetherly community impact"
      className="relative z-10 -mt-7 bg-mint px-5 pb-12 pt-9 dark:bg-neutral-950 sm:px-8 sm:pb-14 sm:pt-10"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {impactStats.map(({ value, label, Icon }) => (
          <article
            key={label}
            className="group flex min-h-[98px] flex-col items-center justify-center rounded-2xl border border-[#dfeae2] bg-white/90 px-2 py-3 text-center shadow-[0_3px_10px_rgba(27,75,47,0.08)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_10px_22px_rgba(7,143,76,0.13)] motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-900/90 dark:hover:border-emerald-800 sm:min-h-[108px] sm:rounded-3xl"
          >
            <Icon
              aria-hidden="true"
              className="mb-1.5 size-4 text-[#078f4c] transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-125 group-hover:text-[#00a852] motion-reduce:transition-none dark:text-emerald-400 dark:group-hover:text-emerald-300 sm:size-[18px]"
              strokeWidth={1.8}
            />
            <span className="text-2xl font-extrabold leading-none tracking-tight text-[#079447] transition-colors group-hover:text-[#00a852] dark:text-emerald-400 dark:group-hover:text-emerald-300 sm:text-3xl">
              {value}
            </span>
            <span className="mt-1.5 text-xs font-medium text-[#5b6d61] dark:text-neutral-300 sm:text-sm">
              {label}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
