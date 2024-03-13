import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useGetEducators } from "@/services/useGetEducators";

import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Skeleton from "@/components/skeleton";

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
    <Layout>
      <div className="space-y-4 my-10 container">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
            Todos educadores
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
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {educators.map((educator) => (
              <Link to={`/educators/${educator.id}`} key={educator.id}>
                <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
                    <h2 className="font-bold">{educator.name}</h2>
                    <p className="line-clamp-3 font-thin text-muted-foreground text-sm h-auto">
                      {educator.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
