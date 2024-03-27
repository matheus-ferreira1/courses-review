import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useGetEducators } from "@/services/useGetEducators";

import { buttonVariants } from "./ui/button";
import EducatorCard from "./educator-card";
import EducatorSkeleton from "./educator-skeleton";

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
        <EducatorSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {educators.slice(0, 5).map((educator) => (
            <EducatorCard key={educator.id} educator={educator} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedEducators;
