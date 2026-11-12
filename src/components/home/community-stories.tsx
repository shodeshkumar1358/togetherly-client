import { MapPin, Sparkles } from "lucide-react";

const stories = [
  {
    label: "Warmth for rickshaw pullers",
    title: "Winter Clothes Drive",
    location: "Mirpur 10, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Volunteers distributing supplies to a local community",
  },
  {
    label: "Shelterless night support",
    title: "Night Blanket Relief",
    location: "Mohammadpur, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Hands coming together to support a community initiative",
  },
  {
    label: "Eco plastic-free waters",
    title: "Dhanmondi Lake Clean-up",
    location: "Dhanmondi, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Volunteers working together on a community project",
  },
  {
    label: "1,000 green saplings",
    title: "Urban Tree Plantation",
    location: "Uttara, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Fresh green plants growing in the sunlight",
  },
  {
    label: "Fresh meals sharing",
    title: "Community Food Relief",
    location: "Old Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Community volunteers preparing to share food",
  },
  {
    label: "Education for every child",
    title: "Children Book & Bag Drive",
    location: "Hayerbazar, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
    imageDescription: "Students learning together in a classroom",
  },
];

export default function CommunityStories() {
  return (
    <section
      aria-labelledby="community-stories-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f8fbf8] to-[#f0f7f1] px-4 py-16 text-[#17251d] dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950 dark:text-white sm:px-6 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 z-0 size-[26rem] rounded-full bg-emerald-200/25 blur-3xl dark:bg-emerald-700/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 z-0 size-[28rem] rounded-full bg-lime-200/20 blur-3xl dark:bg-lime-700/5"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#087443] dark:text-emerald-300">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Visual stories
          </span>
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            id="community-stories-heading"
          >
            Community in Action
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#68776d] dark:text-neutral-300 sm:text-base">
            Moments from volunteer drives, relief distributions, and green
            initiatives across Dhaka and beyond.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-2xl border border-white/80 bg-[#dce9df] shadow-[0_8px_24px_rgba(27,75,47,0.1)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-emerald-700/40 hover:shadow-[0_24px_48px_rgba(27,75,47,0.2)] motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-800 dark:hover:border-emerald-500/40"
              key={story.title}
            >
              <div
                aria-label={story.imageDescription}
                className="pointer-events-none absolute inset-0 z-0 scale-100 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
                role="img"
                style={{
                  backgroundImage: `url("${story.imageUrl}")`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#061910]/90 via-[#061910]/35 to-[#061910]/5 transition-colors duration-500 group-hover:from-[#061910]/95 group-hover:via-[#061910]/45 motion-reduce:transition-none"
              />
              <div className="relative z-10 w-full p-4 sm:p-5">
                <span className="inline-flex max-w-full rounded-md border border-white/20 bg-[#00a987]/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#00c49a] sm:text-[11px]">
                  <span className="truncate">{story.label}</span>
                </span>
                <h3 className="mt-2 text-lg font-extrabold leading-tight tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                  {story.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                  <MapPin
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-[#4ce0bd]"
                  />
                  {story.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
