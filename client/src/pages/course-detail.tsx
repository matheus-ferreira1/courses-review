import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { getCourseById } from "@/api/get-course-by-id";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ReviewList from "@/components/review-list";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const useQueryFn = () => getCourseById(courseId!);

  const {
    isPending,
    isError,
    data: course,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: useQueryFn,
  });

  if (isError) {
    return (
      <div className="py-10 mx-auto">
        Erro ao carregar curso: {error.message}
      </div>
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

          <div>
            <h3 className="font-bold tracking-wider">
              {course.averageRating
                ? `Nota média: ${course.averageRating}/5`
                : "Sem notas para este curso"}
            </h3>
          </div>

          <div className="space-x-1">
            {course.tags.split(",").map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <ReviewList />
        </>
      )}
    </div>
  );
}
