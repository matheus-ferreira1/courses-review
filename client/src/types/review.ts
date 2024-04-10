export type Review = {
  id: string;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt?: Date;
  user: { name: string };
};
