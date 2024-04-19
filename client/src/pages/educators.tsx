import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useGetEducators } from "@/services/useGetEducators";

import { buttonVariants } from "@/components/ui/button";
import EducatorCard from "@/components/educator-card";
import EducatorSkeleton from "@/components/educator-skeleton";

export default function Educators() {
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
    return <div>Erro ao carregar educadores: {error.message}</div>;
  }

  return (
    <div className="space-y-4 my-10 container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Exibindo todos os educadores
        </h1>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to="/new-educator"
        >
          <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
          Novo
        </Link>
      </div>
      {isPending ? (
        <EducatorSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {educators.map((educator) => (
            <EducatorCard key={educator.id} educator={educator} />
          ))}
        </div>
      )}
    </div>
  );
}
