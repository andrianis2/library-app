import type { Category } from '@/constant/category-data';

type CategoryApiResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);

  if (!response.ok) {
    throw new Error('Gagal mengambil kategori');
  }

  const result: CategoryApiResponse = await response.json();

  return result.data.categories;
}
