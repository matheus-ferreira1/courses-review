import { Review } from "@/types/review";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article key={review.id} className="border p-4">
      <h3>{review.rating}</h3>
      <p>{review.description}</p>
    </article>
  );
}
