import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-muted/40 p-4'>
      {children}
    </main>
  );
}
