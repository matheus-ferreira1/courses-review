import { Educator } from "./educator";
import { Review } from "./review";

export type Course = {
  averageRating?: number;
  description: string;
  educator?: Educator;
  educatorId?: string;
  id: string;
  price: number;
  reviews?: Review[];
  tags: string;
  title: string;
  topicId?: string;
};
