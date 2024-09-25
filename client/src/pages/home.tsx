import FeaturedEducators from "@/components/featured-educators";
import FeaturedTopics from "@/components/featured-topics";
import SearchForm from "@/components/search-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <SearchForm />
      <FeaturedEducators />
      <FeaturedTopics />
    </main>
  );
}
