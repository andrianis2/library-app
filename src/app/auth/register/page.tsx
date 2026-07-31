import type { Metadata } from 'next';

import RegisterForm from '@/features/auth/register-form';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Daftar akun baru',
};

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10'>
      <section className='w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold tracking-tight'>Buat akun baru</h1>

          <p className='mt-2 text-sm text-muted-foreground'>
            Lengkapi data berikut untuk membuat akun.
          </p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}
