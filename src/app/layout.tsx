import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';
import { QueryProvider } from '@/providers/query-provider';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Booky',
  description: 'Book recommendation application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id'>
      <body
        className={cn(
          quicksand.className,
          quicksand.variable,
          'min-h-screen bg-white text-slate-950 antialiased'
        )}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
