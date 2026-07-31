import type { Metadata } from 'next';
import Image from 'next/image';
import RegisterForm from '@/features/auth/register-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Daftar akun baru',
};

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10'>
      <section className='w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8'>
        <div className='mb-6 text-center'>
          <Link
            href='/'
            aria-label='Booky home'
            className='group flex items-center gap-2.5 text-2xl font-bold tracking-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4'
          >
            <Image
              src={`/images/logo.png`}
              alt='category'
              width={42}
              height={42}
              className='max-md:h-8 max-md:w-35.25'
            />

            <span>Booky</span>
          </Link>
          <h1 className='text-2xl font-bold tracking-tight'>Register</h1>

          <p className='mt-2 text-sm text-muted-foreground'>
            Create your account to start borrowing books.
          </p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}
