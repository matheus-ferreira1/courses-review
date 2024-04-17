import { Review } from "@/types/review";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "./ui/separator";

export default function ReviewCard({ review }: { review: Review }) {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <article key={review.id} className="border p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold tracking-wide">@{review.user.name}</h1>
        <h6 className="text-muted-foreground">{timeAgo}</h6>
      </div>
      <Separator className="my-1" />
      <h3 className="font-bold">Nota: {review.rating}/5</h3>
      <p>{review.description}</p>
    </article>
  );
}
