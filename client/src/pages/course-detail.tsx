import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";

import { useGetCourseById } from "@/services/useGetCourseById";

import Layout from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: course,
    error,
  } = useQuery({
    queryKey: ["curso"],
    queryFn: () => useGetCourseById(courseId!!),
  });

  if (isError) {
    return (
      <div className="mx-auto">Erro ao carregar curso: {error.message}</div>
    );
  }

  return (
    <Layout>
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
            <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
              {course.title}
            </h1>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-muted-foreground">
                Por:{" "}
                <Link
                  to={`/educators/${course.educatorId}`}
                  className="hover:underline"
                >
                  {course.educator?.name}
                </Link>
              </h3>
              <h6 className="font-bold">Preço: R${course.price}</h6>
            </div>

            <p className="text-justify">{course.description}</p>

            <div className="space-x-1">
              {course.tags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Avaliações
              </h2>
              <Link
                className={buttonVariants({ variant: "outline" })}
                to="/new-course"
              >
                <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
                Nova
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
