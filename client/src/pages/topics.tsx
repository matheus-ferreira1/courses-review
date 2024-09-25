import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useGetTopics } from "@/services/useGetTopics";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import Skeleton from "@/components/skeleton";

export default function Topics() {
  const {
    isPending,
    isError,
    data: topics,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: useGetTopics,
  });

  if (isError) {
    return <div>Erro ao carregar Tópicos: {error.message}</div>;
  }

  return (
    <div className="space-y-4 my-10 container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
          Exibidos todos os tópicos
        </h1>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to="/new-topic"
        >
          <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
          Novo
        </Link>
      </div>
      {isPending ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {topics.map((topic) => (
            <Link
              to={`/topics/${topic.id}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "block truncate text-lg text-center"
              )}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
