import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import { useGetEducators } from "@/services/useGetEducators";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

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
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
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
      <ul className="space-y-2 mb-8">
        {educators?.map((educator) => (
          <li key={educator.id}>
            <Link
              to={`/educators/${educator.id}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex items-center justify-start text-lg"
              )}
            >
              {educator.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
