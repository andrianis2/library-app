'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

import { AuthorCard } from '@/components/authors/author-card';
import { AuthorCardSkeleton } from '@/components/authors/author-card-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getPopularAuthors } from '@/services/author-service';

export function PopularAuthors() {
  const {
    data: authors = [],
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['popular-authors'],
    queryFn: getPopularAuthors,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section
      aria-labelledby='popular-authors-title'
      className='bg-white py-10 md:py-14'
    >
      <div className='mx-auto w-full max-w-7xl border-t px-4 pt-8 sm:px-6 lg:px-8'>
        <h2
          id='popular-authors-title'
          className='mb-6 text-2xl font-bold tracking-tight text-slate-950'
        >
          Popular Authors
        </h2>

        {isLoading && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <AuthorCardSkeleton key={index} />
            ))}
          </div>
        )}

        {isError && (
          <Alert variant='destructive'>
            <AlertCircle className='size-4' />

            <AlertTitle>Data tidak dapat dimuat</AlertTitle>

            <AlertDescription>
              <p>
                {error instanceof Error
                  ? error.message
                  : 'Terjadi kesalahan ketika mengambil data author.'}
              </p>

              <Button
                type='button'
                size='sm'
                variant='outline'
                className='mt-3'
                onClick={() => refetch()}
              >
                Coba lagi
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && authors.length === 0 && (
          <div className='rounded-xl border border-dashed px-6 py-10 text-center'>
            <p className='font-medium text-slate-900'>
              Belum ada popular author
            </p>

            <p className='mt-1 text-sm text-slate-500'>
              Data author akan ditampilkan di sini.
            </p>
          </div>
        )}

        {!isLoading && !isError && authors.length > 0 && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
