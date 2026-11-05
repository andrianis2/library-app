'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { BookCard } from '@/components/books/book-card';
import { getRecommendedBooks } from '@/services/book-service';
import { useBookFilterStore } from '@/store/book-filter-store';
import Link from "next/link";

export function Recommendation() {
  const selectedCategoryId = useBookFilterStore(
    (state) => state.selectedCategoryId
  );

  const selectedCategoryName = useBookFilterStore(
    (state) => state.selectedCategoryName
  );

  const {
    data: books = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['recommended-books', selectedCategoryId],
    queryFn: () => getRecommendedBooks(selectedCategoryId),
  });

  return (
    <section className='bg-slate-50 py-12'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>Recommendation</h2>

          <p className='mt-1 text-sm text-slate-500'>
            {selectedCategoryId === null
              ? 'Semua rekomendasi buku'
              : `Kategori: ${selectedCategoryName}`}
          </p>
        </div>

        {isLoading && <p className='py-10 text-center'>Loading buku...</p>}

        {isError && (
          <p className='py-10 text-center text-red-600'>
            {error instanceof Error
              ? error.message
              : 'Rekomendasi gagal dimuat'}
          </p>
        )}

        {!isLoading && !isError && books.length === 0 && (
          <p className='rounded-xl border border-dashed bg-white p-10 text-center'>
            Belum ada buku pada kategori ini.
          </p>
        )}

        {!isLoading && !isError && books.length > 0 && (
          <div
            className={cn(
              'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5',
              isFetching && 'opacity-60'
            )}
          >
            
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="block rounded-xl transition hover:-translate-y-1 hover:shadow-lg"
            >
              <BookCard book={book} />
            </Link>
          ))}

          </div>
        )}
      </div>
    </section>
  );
}
