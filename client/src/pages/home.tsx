import EducatorList from "@/components/educator-list";
import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="flex flex-col items-center py-4">
        <EducatorList />
      </main>

      <footer>footer</footer>
    </div>
  );
}
