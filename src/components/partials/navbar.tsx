'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';
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
    <header className='sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur'>
      <nav
        aria-label='Navigasi utama'
        className='mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-6'
      >
        {/* Logo */}
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

        {/* Desktop navigation */}
        <div className='hidden items-center gap-4 md:flex'>
          <Button
            asChild
            variant='outline'
            className='h-11 min-w-36 rounded-full border-slate-300 bg-white px-8 font-semibold text-slate-900 shadow-none hover:bg-slate-50'
          >
            <Link href='/login'>Login</Link>
          </Button>

          <Button
            asChild
            className='h-11 min-w-36 rounded-full bg-blue-600 px-8 font-semibold text-white shadow-none hover:bg-blue-700'
          >
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
              className='size-10 rounded-full md:hidden'
              aria-label='Buka navigasi utama'
            >
              <Menu className='size-6' aria-hidden='true' />
            </Button>
          </SheetTrigger>

          <SheetContent side='right' className='w-[300px] sm:w-[360px]'>
            <SheetHeader className='text-left'>
              <SheetTitle className='flex items-center gap-2.5 text-xl'>
                <Image
                  src={`/images/logo.png`}
                  alt='category'
                  width={42}
                  height={42}
                  className='max-md:h-8 max-md:w-35.25'
                />
                Booky
              </SheetTitle>
            </SheetHeader>

            <div className='mt-8 flex flex-col gap-3'>
              <SheetClose asChild>
                <Button
                  asChild
                  variant='outline'
                  className='h-11 w-full rounded-full'
                >
                  <Link href='/login'>Login</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  asChild
                  className='h-11 w-full rounded-full bg-blue-600 hover:bg-blue-700'
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
