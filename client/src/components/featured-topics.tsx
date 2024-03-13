import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetTopics } from "@/services/useGetTopics";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { buttonVariants } from "./ui/button";
import Skeleton from "./skeleton";

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
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {topics
              .slice(0, 5)
              .map(
                (educator: {
                  id: string;
                  name: string;
                  description: string;
                }) => (
                  <Link
                    to={`/topics/${educator.id}`}
                    key={educator.id}
                    className="size-72"
                  >
                    <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
                        <h2 className="font-bold">{educator.name}</h2>
                        <p className="line-clamp-3 font-thin text-muted-foreground text-sm h-auto">
                          {educator.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default FeaturedTopics;
