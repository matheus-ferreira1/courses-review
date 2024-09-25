import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useGetFeaturedEducators } from "@/services/useGetFeaturedEducators";

import { buttonVariants } from "./ui/button";
import EducatorSkeleton from "./educator-skeleton";

const FeaturedEducators = () => {
  const {
    isPending,
    isError,
    data: educators,
    error,
  } = useQuery({
    queryKey: ["featuredEducators"],
    queryFn: useGetFeaturedEducators,
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
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
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
        <EducatorSkeleton />
      ) : (
        <div className="space-y-2">
          {educators.map((educator) => (
            <Link
              key={educator.id}
              to={`/educators/${educator.id}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex items-center justify-start text-lg"
              )}
            >
              <h2 className="text-lg font-semibold">{educator.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedEducators;
