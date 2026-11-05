export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface BookInfo {
  id: number;
  title: string;
  coverImage?: string;
  author?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

export interface Loan {
  id: number;
  status: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  duration?: number;
  book: BookInfo;
}

export interface UserReview {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  book: BookInfo;
}