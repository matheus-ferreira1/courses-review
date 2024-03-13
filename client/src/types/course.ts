export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  comments?: string[];
  ratings?: number;
  tags: string[];
  imgUrl?: string;
};
