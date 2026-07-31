import { Star } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import type { Book } from '@/constant/recommended-data';

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className='overflow-hidden rounded-2xl border bg-white p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='relative aspect-[2/3] w-full overflow-hidden bg-slate-100'>
        <Image
          src={book.coverImage}
          alt={`Sampul buku ${book.title}`}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
          className='object-cover transition duration-300 hover:scale-105'
        />
      </div>

      <CardContent className='space-y-2 p-4'>
        <h3 className='line-clamp-1 text-base font-semibold text-slate-900'>
          {book.title}
        </h3>

        <p className='line-clamp-1 text-sm text-slate-500'>
          {book.author?.name}
        </p>

        <div className='flex items-center gap-1 text-sm font-medium'>
          <Star
            className='size-5 fill-amber-400 text-amber-400'
            aria-hidden='true'
          />

          <span>{Number(book.rating ?? 0).toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
