import FeaturedEducators from "@/components/featured-educators";
import FeaturedTopics from "@/components/featured-topics";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-col items-center">
        <FeaturedEducators />
        <FeaturedTopics />
      </main>
    </Layout>
  );
}
