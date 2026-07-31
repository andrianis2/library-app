import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/login-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Masuk ke akun Library App',
};

const LoginPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-100 px-4'>
      <section className='w-full max-w-md rounded-xl border bg-background p-6 shadow-sm'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Login</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Masukkan email dan password Anda.
          </p>
        </div>

        <LoginForm />
        <p className='text-center text-sm text-muted-foreground'>
          Belum mempunyai akun?{' '}
          <Link
            href='/auth/register'
            className='font-medium text-primary hover:underline'
          >
            Daftar
          </Link>
        </p>
      </section>
    </main>
  );
};
export default LoginPage;
