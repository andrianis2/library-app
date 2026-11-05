import type { Book } from '@/constant/book';

type RecommendationApiResponse = {
  success: boolean;
  message: string;
  data: {
    mode: string;
    books: Book[];
  };
};

export interface BookDetail {
  id: number;
  title: string;
  author?: string;
  description?: string;
  cover_image?: string;
  image?: string;
  category?: string;
  category_name?: string;
  isbn?: string;
  publisher?: string;
  published_year?: number | string;
  stock?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRecommendedBooks(
  categoryId: number | null
): Promise<Book[]> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL belum dikonfigurasi');
  }

  const params = new URLSearchParams();

  if (categoryId !== null) {
    params.set('categoryId', String(categoryId));
  }

  const queryString = params.toString();

  const url = `${API_URL}/api/books/recommend${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil rekomendasi. Status: ${response.status}`);
  }

  const result: RecommendationApiResponse = await response.json();

  if (!Array.isArray(result.data?.books)) {
    throw new Error('Format data rekomendasi tidak sesuai');
  }

  return result.data.books;
}

export async function getBookById(
  id: string | number
): Promise<BookDetail> {
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Buku tidak ditemukan.");
    }

    throw new Error("Gagal mengambil detail buku.");
  }

  const result = await response.json();

  return (result.data ?? result) as BookDetail;
}