import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { label: 'Facebook', shortLabel: 'f', href: '#' },
  { label: 'Instagram', shortLabel: '◎', href: '#' },
  { label: 'LinkedIn', shortLabel: 'in', href: '#' },
  { label: 'TikTok', shortLabel: '♪', href: '#' },
];

export function Footer() {
  return (
    <footer className='mt-20 w-full border-t border-slate-200 bg-white'>
      <div className='mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-16 text-center sm:px-8 lg:px-6 lg:py-20'>
        <Link
          href='/'
          aria-label='Booky home'
          className='flex items-center gap-2.5 text-2xl font-bold tracking-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4'
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

        <p className='mt-6 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base'>
          Discover inspiring stories &amp; timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </p>

        <p className='mt-9 text-sm font-semibold text-slate-900'>
          Follow on Social Media
        </p>

        <nav aria-label='Media sosial' className='mt-4 flex items-center gap-3'>
          {socialLinks.map((social) => (
            <Button
              key={social.label}
              asChild
              variant='outline'
              size='icon'
              className='size-9 rounded-full border-slate-300 bg-white p-0 font-bold text-slate-900 shadow-none hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600'
            >
              <a href={social.href} aria-label={social.label}>
                <span aria-hidden='true' className='text-sm leading-none'>
                  {social.shortLabel}
                </span>
              </a>
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
