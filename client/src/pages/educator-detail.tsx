import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";

import { useGetEducatorById } from "@/services/useGetEducatorById";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CoursesListByEducator from "@/components/courses-list-educator";

export default function EducatorDetail() {
  const { educatorId } = useParams();
  const navigate = useNavigate();

  const useQueryFn = () => useGetEducatorById(educatorId!);

  const {
    isPending,
    isError,
    data: educator,
    error,
  } = useQuery({
    queryKey: ["educator", educatorId],
    queryFn: useQueryFn,
  });

  if (isError) {
    return (
      <div className="mx-auto">Erro ao carregar educador: {error.message}</div>
    );
  }

  return (
    <div className="space-y-4 my-10 container">
      <button
        onClick={() => navigate(-1)}
        className={buttonVariants({ variant: "outline" })}
      >
        Voltar
      </button>
      {isPending ? (
        <div className="w-full">
          <Loader2 className="animate mx-auto" />
        </div>
      ) : (
        <>
          <img
            src={educator.imgUrl}
            alt={`Imagem de perfil de ${educator.name}`}
            className="rounded-full size-40 object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
            {educator?.name}
          </h1>

          <p className="text-justify">{educator?.description}</p>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight">Cursos</h2>
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/new-course"
            >
              <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
              Novo
            </Link>
          </div>
          <CoursesListByEducator educatorId={educatorId} />
        </>
      )}
    </div>
  );
}
