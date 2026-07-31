import type { Author, PopulerAuthor } from '@/constant/author-data';

type PopularAuthorsApiResponse = {
  success: boolean;
  message: string;
  data: {
    authors: Author[];
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPopularAuthors(): Promise<Author[]> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL belum dikonfigurasi');
  }

  const response = await fetch(`${API_URL}/api/authors/popular`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request gagal dengan status ${response.status}`);
  }

  const result: PopularAuthorsApiResponse = await response.json();

  if (!result.success || !Array.isArray(result.data?.authors)) {
    throw new Error('Format data popular authors tidak sesuai');
  }

  return result.data.authors;
}
