import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useGetTopics } from "@/services/useGetTopics";

import Layout from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import Skeleton from "@/components/skeleton";
import TopicCard from "@/components/topic-card";

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
    <Layout>
      <div className="space-y-4 my-10 container">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
