export type Book = {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  coverImage: string;
  rating: number;
  categoryId: number;
};

export type RecommendationBook = {
  data: Book[];
  meta?: {
    page: number;
    totalPages: number;
  };
};
