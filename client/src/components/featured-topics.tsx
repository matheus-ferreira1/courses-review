import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetTopics } from "@/services/useGetTopics";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { buttonVariants } from "./ui/button";
import Skeleton from "./skeleton";
import TopicCard from "./topic-card";

const FeaturedTopics = () => {
  const {
    isPending,
    isError,
    data: topics,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: useGetTopics,
  });

  if (isPending) {
    return <div>Carregando tópicos...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar tópicos: {error.message}</div>;
  }

  return (
    <div className="space-y-4 my-10 container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Principais tópicos
        </h1>
        <Link className={buttonVariants({ variant: "outline" })} to="/topics">
          Ver todos
        </Link>
      </div>

      {isPending ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {topics.slice(0, 7).map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedTopics;
