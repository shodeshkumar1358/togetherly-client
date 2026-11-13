"use client";
import { Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type EventDetails = {
  id?: string;
  _id?: string;
  title?: string;
  type?: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  email?: string;
  volunteerCount?: number;
};

const EventActionBtn = ({ EventDetails }: { EventDetails: EventDetails }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleJoinEvent = async () => {
    const data = {
      userName: user?.name,
      userEmail: user?.email,
      eventId: EventDetails.id || EventDetails._id,
      userImage: user?.image,
      ...EventDetails,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <section aria-label="Join this event" className="mb-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-forest">
            <Users aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold">
              {EventDetails.volunteerCount || 0} volunteers joined
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign up to join hands for this drive.
            </p>
          </div>
        </div>

        <button
          disabled={isPending || !user}
          onClick={handleJoinEvent}
          type="button"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Users aria-hidden="true" className="size-4" />
          {isPending ? "Checking account..." : "Join event"}
        </button>
      </div>
    </section>
  );
};

export default EventActionBtn;
