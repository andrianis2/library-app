import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthorCardSkeleton() {
  return (
    <Card className='border-slate-100'>
      <CardContent className='flex items-center gap-3 p-4'>
        <Skeleton className='size-14 shrink-0 rounded-full' />

        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-16' />
        </div>
      </CardContent>
    </Card>
  );
}
