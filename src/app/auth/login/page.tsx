import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/login-form';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Masuk ke akun Library App',
};

const LoginPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-100 px-4'>
      <section className='w-full max-w-md rounded-xl border bg-background p-6 shadow-sm'>
        <div className='mb-6'>
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
          <h1 className='text-2xl font-bold'>Login</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Sign in to manage your library account.
          </p>
        </div>

        <LoginForm />
        <p className='text-center text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link
            href='/auth/register'
            className='font-medium text-primary hover:underline'
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};
export default LoginPage;
