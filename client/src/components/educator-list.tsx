import { useQuery } from "@tanstack/react-query";

import { useGetEducators } from "@/services/useGetEducators";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const EducatorList = () => {
  const {
    isPending,
    isError,
    data: educators,
    error,
  } = useQuery({
    queryKey: ["educators"],
    queryFn: useGetEducators,
  });

  if (isPending) {
    return <div>Carregando educadores...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar educadores: {error.message}</div>;
  }

  return (
    <div className="space-y-4 my-10 container">
      <h1 className="mx-auto text-3xl font-extrabold tracking-tight lg:text-4xl">
        Principais educadores
      </h1>
      <Carousel className="w-full">
        <CarouselContent>
          {educators.map(
            (educator: { id: string; name: string; description: string }) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                key={educator.id}
              >
                <Link to={`/educators/${educator.id}`}>
                  <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
                      <h2 className="font-bold">{educator.name}</h2>
                      <p className="line-clamp-3 font-thin text-muted-foreground text-sm">
                        {educator.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default EducatorList;
