import type { Book as RecommendedBook } from '@/constant/recommended-data';
import type { Book } from '@/types/book';

type RecommendationApiResponse = {
  success: boolean;
  message: string;
  data: {
    mode: string;
    books: RecommendedBook[];
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRecommendedBooks(
  categoryId: number | null
): Promise<RecommendedBook[]> {
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
): Promise<Book> {
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

  return (result.data ?? result) as Book;
}