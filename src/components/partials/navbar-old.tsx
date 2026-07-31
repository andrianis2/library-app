'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur'>
      <nav
        aria-label='Navigasi utama'
        className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'
      >
        {/* Logo */}
        <Link
          href='/'
          aria-label='Booky home'
          className='flex items-center gap-2 text-2xl font-bold text-slate-950'
        >
          <span
            aria-hidden='true'
            className='flex size-9 items-center justify-center rounded-full bg-blue-600 text-xl text-white'
          >
            ✺
          </span>

          <span>Booky</span>
        </Link>

        {/* Desktop navigation */}
        <div className='hidden items-center gap-3 md:flex'>
          <Button asChild variant='outline'>
            <Link href='/login'>Login</Link>
          </Button>

          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/register'>Register</Link>
          </Button>
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='md:hidden'
              aria-label='Buka navigasi utama'
            >
              <Menu className='size-6' aria-hidden='true' />
            </Button>
          </SheetTrigger>

          <SheetContent side='right' className='w-[300px] sm:w-[360px]'>
            <SheetHeader className='text-left'>
              <SheetTitle className='flex items-center gap-2'>
                <span
                  aria-hidden='true'
                  className='flex size-8 items-center justify-center rounded-full bg-blue-600 text-white'
                >
                  ✺
                </span>
                Booky
              </SheetTitle>
            </SheetHeader>

            <div className='mt-8 flex flex-col gap-3'>
              <SheetClose asChild>
                <Button asChild variant='outline' className='w-full'>
                  <Link href='/login'>Login</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  asChild
                  className='w-full bg-blue-600 hover:bg-blue-700'
                >
                  <Link href='/register'>Register</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
