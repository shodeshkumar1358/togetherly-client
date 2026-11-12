import Banner from "@/components/home/banner";
import Features from "@/components/home/features";
import SubscribeSection from "@/components/home/subscribe";
import UpcomingEvents from "@/components/home/upcomming-events";
import CommunityStories from "@/components/home/community-stories";
import ImpactStats from "@/components/home/impact-stats";

export default function HomePage() {
  return (
    <>
      <Banner />
      <ImpactStats />
      <UpcomingEvents />
      <CommunityStories />
      <Features />
      <SubscribeSection />
    </>
  );
}
