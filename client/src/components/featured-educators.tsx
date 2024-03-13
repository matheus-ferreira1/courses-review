import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetEducators } from "@/services/useGetEducators";

import { buttonVariants } from "./ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "./skeleton";

const FeaturedEducators = () => {
  const {
    isPending,
    isError,
    data: educators,
    error,
  } = useQuery({
    queryKey: ["educators"],
    queryFn: useGetEducators,
  });

  if (isError) {
    return (
      <div className="mx-auto">
        Erro ao carregar educadores: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4 my-10 container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Principais educadores
        </h1>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to="/educators"
        >
          Ver todos
        </Link>
      </div>

      {isPending ? (
        <Skeleton />
      ) : (
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {educators!!
              .slice(0, 5)
              .map(
                (educator: {
                  id: string;
                  name: string;
                  description: string;
                }) => (
                  <Link
                    to={`/educators/${educator.id}`}
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

export default FeaturedEducators;
