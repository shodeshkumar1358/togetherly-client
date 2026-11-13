"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  CalendarDays,
  CircleCheck,
  CirclePlus,
  HeartHandshake,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Tag,
  TriangleAlert,
  X,
} from "lucide-react";

const eventTypes = [
  "Donation",
  "Clothing drive",
  "Food drive",
  "Community cleanup",
  "Tree planting",
  "Community support",
  "Other",
];

const imagePresets = [
  {
    name: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cleanup",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
  },
];

type EventFormData = {
  title: string;
  type: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  email: string;
};

const initialFormData: EventFormData = {
  title: "",
  type: "",
  date: "",
  location: "",
  imageUrl: "",
  description: "",
  email: "",
};

function getTodayDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsError, setToastIsError] = useState(false);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setToastMessage(""), 4000);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    setToastMessage("");
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Event submission failed with status ${response.status}`,
        );
      }

      console.log("Event form data:", formData);
      setToastIsError(false);
      setToastMessage("Form data submitted successfully.");
    } catch (error) {
      console.error("Failed to submit event form:", error);
      setToastIsError(true);
      setToastMessage("Could not submit the form. Please try again.");
    }
  };

  function chooseImage(url: string) {
    setFormData((previousData) => ({
      ...previousData,
      imageUrl: url,
    }));
    setToastMessage("");
  }

  return (
    <main className="min-h-screen bg-[#f0f6f2] px-4 pb-16 pt-28 text-[#17251d] dark:bg-neutral-950 dark:text-white sm:px-6 sm:pt-32">
      {toastMessage && (
        <div
          aria-live={toastIsError ? "assertive" : "polite"}
          className={`fixed right-4 top-24 z-[60] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-xl sm:right-6 ${
            toastIsError
              ? "border-red-200 bg-white text-red-900 dark:border-red-900 dark:bg-neutral-900 dark:text-red-200"
              : "border-emerald-200 bg-white text-[#075c37] dark:border-emerald-900 dark:bg-neutral-900 dark:text-emerald-200"
          }`}
          role={toastIsError ? "alert" : "status"}
        >
          {toastIsError ? (
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-red-600"
            />
          ) : (
            <CircleCheck
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-emerald-600"
            />
          )}
          <p className="flex-1 text-sm font-semibold">{toastMessage}</p>
          <button
            aria-label="Dismiss notification"
            className="rounded-md p-1 text-current/70 transition hover:bg-black/5 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:hover:bg-white/10"
            onClick={() => setToastMessage("")}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e35] via-[#087443] to-[#00a852] px-6 py-8 text-white shadow-xl shadow-emerald-950/10 sm:px-9 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-20 size-56 rounded-full border-[28px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-24 size-52 rounded-full bg-[#b7f36b]/20 blur-3xl"
          />
          <div className="relative">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#087443] shadow-sm">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Make a difference together
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Create a community event
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Share your idea and invite your neighbors to make a difference.
            </p>
          </div>
        </div>

        <section
          aria-labelledby="event-form-heading"
          className="rounded-3xl border border-[#e3ebe5] bg-white p-5 shadow-[0_20px_60px_rgba(22,67,41,0.08)] dark:border-white/10 dark:bg-neutral-900 sm:p-8"
        >
          <div className="mb-7 flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f5ec] text-[#087443] dark:bg-emerald-950 dark:text-emerald-300">
              <HeartHandshake aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2
                id="event-form-heading"
                className="text-xl font-extrabold tracking-tight sm:text-2xl"
              >
                Event details
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#68776d] dark:text-neutral-400">
                Fill in the information for your event.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="event-title"
              >
                Event title <span className="text-rose-600">*</span>
              </label>
              <input
                autoComplete="off"
                className="min-h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] px-4 text-sm outline-none transition placeholder:text-[#94a49a] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950 dark:placeholder:text-neutral-600"
                id="event-title"
                maxLength={100}
                name="title"
                onChange={handleChange}
                placeholder="e.g. Winter clothes distribution"
                required
                value={formData.title}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-bold"
                  htmlFor="event-type"
                >
                  Event type <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Tag
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#809187]"
                  />
                  <select
                    className="min-h-12 w-full appearance-none rounded-xl border border-[#dce7df] bg-[#f8fbf9] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950"
                    id="event-type"
                    name="type"
                    onChange={handleChange}
                    required
                    value={formData.type}
                  >
                    <option disabled value="">
                      Select an event type
                    </option>
                    {eventTypes.map((eventType) => (
                      <option key={eventType} value={eventType}>
                        {eventType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-bold"
                  htmlFor="event-date"
                >
                  Event date <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#809187]"
                  />
                  <input
                    className="min-h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950"
                    id="event-date"
                    min={getTodayDate()}
                    name="date"
                    onChange={handleChange}
                    required
                    type="date"
                    value={formData.date}
                  />
                </div>
                <p className="mt-1.5 text-xs text-[#68776d] dark:text-neutral-400">
                  Choose today or a future date.
                </p>
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="event-location"
              >
                Location / venue <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <MapPin
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#809187]"
                />
                <input
                  autoComplete="street-address"
                  className="min-h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#94a49a] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950 dark:placeholder:text-neutral-600"
                  id="event-location"
                  maxLength={160}
                  name="location"
                  onChange={handleChange}
                  placeholder="e.g. Community Hall, Dhaka"
                  required
                  value={formData.location}
                />
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="event-image"
              >
                Thumbnail image URL <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <ImageIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#809187]"
                />
                <input
                  className="min-h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#94a49a] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950 dark:placeholder:text-neutral-600"
                  id="event-image"
                  name="imageUrl"
                  onChange={handleChange}
                  placeholder="https://example.com/your-event-photo.jpg"
                  required
                  type="url"
                  value={formData.imageUrl}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span className="text-[#68776d] dark:text-neutral-400">
                  Quick photo presets:
                </span>
                {imagePresets.map((preset, index) => (
                  <span
                    className="inline-flex items-center gap-2"
                    key={preset.name}
                  >
                    <button
                      aria-pressed={formData.imageUrl === preset.url}
                      className={`font-semibold text-[#078f9a] underline-offset-2 transition hover:text-[#056b70] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078f9a] dark:text-teal-300 dark:hover:text-teal-200 ${
                        formData.imageUrl === preset.url ? "underline" : ""
                      }`}
                      onClick={() => chooseImage(preset.url)}
                      type="button"
                    >
                      {preset.name}
                    </button>
                    {index < imagePresets.length - 1 && (
                      <span aria-hidden="true" className="text-[#9aaba0]">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="event-description"
              >
                Event description <span className="text-rose-600">*</span>
              </label>
              <textarea
                className="min-h-32 w-full resize-y rounded-xl border border-[#dce7df] bg-[#f8fbf9] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#94a49a] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10 dark:border-white/10 dark:bg-neutral-950 dark:placeholder:text-neutral-600"
                id="event-description"
                maxLength={1000}
                name="description"
                onChange={handleChange}
                placeholder="What is the purpose of this event? Let people know how they can help."
                required
                value={formData.description}
              />
            </div>

            <div>
              <p className="mt-1.5 text-xs text-[#68776d] dark:text-neutral-400">
                We’ll use this address for event-related contact.
              </p>
            </div>

            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#25c45c] px-5 text-sm font-extrabold text-white shadow-md shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078f4c] active:translate-y-0"
              type="submit"
            >
              <CirclePlus aria-hidden="true" className="size-4" />
              Create Event
            </button>
            <p className="text-center text-xs text-[#68776d] dark:text-neutral-400">
              Fields marked <span className="text-rose-600">*</span> are
              required.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
