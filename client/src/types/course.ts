import { Educator } from "./educator";

export type Course = {
  description: string;
  educator?: Educator;
  educatorId?: string;
  id: string;
  price: number;
  tags: string;
  title: string;
  topicId?: string;
  comments?: string[];
  ratings?: number;
  imgUrl?: string;
};
