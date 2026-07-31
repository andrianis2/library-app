import type { Book } from '@/constant/book';

type RecommendationApiResponse = {
  success: boolean;
  message: string;
  data: {
    mode: string;
    books: Book[];
  };
};

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
