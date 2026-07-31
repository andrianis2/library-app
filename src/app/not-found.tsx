import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <p className='text-sm font-medium text-muted-foreground'>Error 404</p>

      <h1 className='text-4xl font-bold'>Halaman tidak ditemukan</h1>

      <p className='max-w-md text-muted-foreground'>
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.
      </p>

      <Button asChild>
        <Link href='/'>Kembali ke beranda</Link>
      </Button>
    </main>
  );
}
