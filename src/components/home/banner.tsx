import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Leaf,
  UserRound,
} from "lucide-react";
import ImpactStats from "@/components/home/impact-stats";

export default function Banner() {
  return (
    <main className="bg-[#f0f6f2] text-[#17251d] dark:bg-neutral-950 dark:text-white">
      <section
        aria-labelledby="banner-heading"
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0 -z-20 bg-[#e8f5ec] dark:bg-neutral-900" />
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/banner.png"
            alt="Volunteers planting trees together in a green park"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 80vw"
            className="object-cover object-[42%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#dce9df]/95 via-[#e8f0e9]/90 via-30% to-transparent to-55% dark:from-neutral-950/95 dark:via-neutral-950/85 dark:via-30% dark:to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#062415]/25 via-[#062415]/10 to-transparent backdrop-blur-[1px] dark:from-black/35 dark:via-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0f6f2]/35 via-transparent to-transparent dark:from-neutral-950/30" />
        </div>
        <div
          aria-hidden="true"
          className="absolute -left-20 top-28 -z-10 size-64 rounded-full bg-emerald-300/20 blur-3xl"
        />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:px-10">
          <div className="max-w-[620px]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-2 text-xs font-bold text-emerald-950 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-200 sm:text-sm">
              <Leaf
                aria-hidden="true"
                className="size-4 fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400"
              />
              Together for a Better Tomorrow
            </p>

            <h1
              id="banner-heading"
              className="group/hero max-w-[600px] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Small Actions
              <br />
              Create{" "}
              <span className="relative inline-block text-[#079447] transition-all duration-300 group-hover/hero:scale-[1.03] group-hover/hero:text-[#00a852] motion-reduce:transition-none dark:text-emerald-400 dark:group-hover/hero:text-emerald-300">
                Big Change
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-1/4 h-1 w-3/4 -rotate-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-300 group-hover/hero:left-0 group-hover/hero:w-full group-hover/hero:h-1.5 motion-reduce:transition-none"
                />
              </span>
            </h1>

            <p className="mt-6 max-w-[500px] text-sm leading-6 text-[#1d2c22] dark:text-neutral-200 sm:text-base sm:leading-7">
              Join Togetherly and be part of a growing community of volunteers,
              changemakers and kind hearts. Together we can build a healthier,
              happier and more sustainable world.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#upcoming-events"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#078f4c] to-[#25c45c] px-6 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Explore Upcoming Events
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#078f4c] bg-white/70 px-6 text-sm font-bold text-[#087443] transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:bg-neutral-950/60 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
              >
                <Heart aria-hidden="true" className="size-4 fill-current" />
                Create an Enent
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div aria-hidden="true" className="flex -space-x-2">
                {[0, 1, 2, 3].map((person) => (
                  <span
                    key={person}
                    className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-amber-100 to-emerald-100 text-emerald-800 shadow-sm dark:border-neutral-900 dark:from-emerald-800 dark:to-emerald-950 dark:text-emerald-100"
                  >
                    <UserRound className="size-4" />
                  </span>
                ))}
              </div>
              <p className="text-xs font-medium text-[#1d2c22] dark:text-neutral-200 sm:text-sm">
                <span className="font-extrabold text-[#17251d] dark:text-white">
                  1,450+
                </span>{" "}
                volunteers are already making an impact
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImpactStats />
    </main>
  );
}
