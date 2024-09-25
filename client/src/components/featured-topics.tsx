import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetFeaturedTopics } from "@/services/useGetFeaturedTopics";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";
import TopicSkeleton from "./topic-skeleton";

const FeaturedTopics = () => {
  const {
    isPending,
    isError,
    data: topics,
    error,
  } = useQuery({
    queryKey: ["featuredTopics"],
    queryFn: useGetFeaturedTopics,
  });

  if (isError) {
    return <div>Erro ao carregar tópicos: {error.message}</div>;
  }

  return (
    <div className="space-y-4 my-10 container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
          Principais tópicos
        </h1>
        <Link className={buttonVariants({ variant: "outline" })} to="/topics">
          Ver todos
        </Link>
      </div>

      {isPending ? (
        <TopicSkeleton />
      ) : (
        <div className="space-y-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex items-center justify-start text-lg"
              )}
            >
              <h2 className="text-lg font-semibold">{topic.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedTopics;
