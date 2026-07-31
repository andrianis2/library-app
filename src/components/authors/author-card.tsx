import { BookOpen } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import type { Author } from '@/constant/author-data';

type AuthorCardProps = {
  author: Author;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className='border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>
      <CardContent className='flex items-center gap-3 p-4'>
        <Avatar className='size-14 shrink-0 border'>
          <AvatarImage
            src='/images/author.png'
            alt={`Foto ${author.name}`}
            className='object-cover'
          />

          <AvatarFallback className='bg-blue-100 font-semibold text-blue-700'>
            {getInitials(author.name)}
          </AvatarFallback>
        </Avatar>

        <div className='min-w-0'>
          <h3 className='truncate text-sm font-semibold text-slate-900'>
            {author.name}
          </h3>

          <div className='mt-1 flex items-center gap-1.5 text-xs text-slate-600'>
            <span className='flex size-4 items-center justify-center rounded-sm bg-blue-600'>
              <BookOpen className='size-3 text-white' aria-hidden='true' />
            </span>

            <span>
              {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
