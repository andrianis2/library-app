import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BookCardSkeleton() {
  return (
    <Card className='overflow-hidden rounded-2xl p-0'>
      <Skeleton className='aspect-[2/3] w-full rounded-none' />

      <CardContent className='space-y-3 p-4'>
        <Skeleton className='h-5 w-4/5' />
        <Skeleton className='h-4 w-3/5' />
        <Skeleton className='h-4 w-16' />
      </CardContent>
    </Card>
  );
}
