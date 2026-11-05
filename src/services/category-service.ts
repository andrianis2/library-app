type CategoryApiResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryBook {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  author?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
}


export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);

  if (!response.ok) {
    throw new Error('Gagal mengambil kategori');
  }

  const result: CategoryApiResponse = await response.json();

  return result.data.categories;
}

export async function getAllBooks(): Promise<CategoryBook[]> {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("Gagal mengambil daftar buku");
  }

  const result = await response.json();

  return (
    result.data?.books ??
    result.data ??
    result.books ??
    []
  );
}

export async function getBooksByCategory(
  categoryId: number
): Promise<CategoryBook[]> {
  const response = await fetch(
    `${API_URL}/books?categoryId=${categoryId}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil daftar buku");
  }

  const result = await response.json();

  // Menyesuaikan kemungkinan bentuk response API.
  const books =
    result.data?.books ??
    result.data ??
    result.books ??
    [];

  if (!Array.isArray(books)) {
    throw new Error("Format data buku dari API tidak sesuai");
  }

  return books;
}