import { Link, useParams } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useGetReviewsByCourse } from "@/services/useGetReviewByCourse";

import { buttonVariants } from "./ui/button";
import ReviewCard from "./review-card";

export default function ReviewList() {
  const { courseId } = useParams();

  const useQueryFn = () => useGetReviewsByCourse(courseId!);

  const {
    isPending,
    isError,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", courseId],
    queryFn: useQueryFn,
  });

  if (isError) {
    return (
      <div className="mx-auto">
        Erro ao carregar avaliações do curso: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Avaliações</h2>
          <span className="text-lg text-muted-foreground font-bold ml-2">
            ({reviews?.length})
          </span>
        </div>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={`/new-review/${courseId}`}
        >
          <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
          Nova
        </Link>
      </div>

      {isPending ? (
        <div className="w-full">
          <Loader2 className="animate mx-auto" />
        </div>
      ) : reviews.length > 0 ? (
        <div className="mt-4 space-y-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center my-8 text-muted-foreground">
          Ainda não há nenhuma avaliação para este curso.
        </div>
      )}
    </div>
  );
}
