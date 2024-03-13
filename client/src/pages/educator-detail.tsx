import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Layout from "@/components/layout";
import { useGetEducatorById } from "@/services/useGetEducatorById";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CoursesList from "@/components/courses-list";

export default function EducatorDetail() {
  const { educatorId } = useParams();

  const {
    isPending,
    isError,
    data: educator,
    error,
  } = useQuery({
    queryKey: ["educator"],
    queryFn: () => useGetEducatorById(educatorId!!),
  });

  if (isError) {
    return (
      <div className="mx-auto">Erro ao carregar educador: {error.message}</div>
    );
  }

  if (isPending) {
    return <div className="mx-auto">Carregando...</div>;
  }

  return (
    <Layout>
      <div className="space-y-4 my-10 container">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          {educator?.name}
        </h1>
        <p>{educator?.description}</p>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="#"
          //   target="_blank"
          rel="noopener noreferrer"
        >
          Página do educador
        </a>
        <Separator className="my-4" />
        <h2 className="text-2xl font-extrabold tracking-tight">Cursos</h2>
        <CoursesList educatorId={educatorId} />
      </div>
    </Layout>
  );
}
