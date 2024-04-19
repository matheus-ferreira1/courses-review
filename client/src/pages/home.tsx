import FeaturedEducators from "@/components/featured-educators";
import FeaturedTopics from "@/components/featured-topics";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <FeaturedEducators />
      <FeaturedTopics />
    </main>
  );
}
