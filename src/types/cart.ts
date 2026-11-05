
export interface CartBook {
  id: number;
  title: string;
  coverImage: string;
  rating?: number;
  author?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

export interface CartItem {
  id: number;
  bookId: number;
  quantity: number;
  book: CartBook;
}

export interface CartResponse {
  items: CartItem[];
}
