import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetEducators } from "@/services/useGetEducators";

import { buttonVariants } from "./ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Skeleton from "./skeleton";
import EducatorCard from "./educator-card";

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
            {educators!!.slice(0, 5).map((educator) => (
              <EducatorCard
                key={educator.id}
                educator={educator}
                className="size-72"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default FeaturedEducators;
