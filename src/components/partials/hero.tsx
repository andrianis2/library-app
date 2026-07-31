import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

const Hero = () => {
  return (
    <section
      aria-label='Booky introduction'
      className='w-full bg-white py-4 sm:py-6 md:py-8'
    >
      <div className='mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8'>
        <Card className='overflow-hidden rounded-2xl border-0 bg-transparent p-0 shadow-none'>
          <CardContent className='relative aspect-[1200/441] p-0'>
            <Image
              src='/images/hero.png'
              alt='Welcome to Booky'
              fill
              priority
              sizes='(max-width: 1280px) calc(100vw - 2rem), 1200px'
              className='object-cover'
            />
          </CardContent>
        </Card>

        <div
          className='mt-3 flex items-center justify-center gap-2'
          aria-hidden='true'
        >
          <span className='size-2 rounded-full bg-blue-600' />
          <span className='size-2 rounded-full bg-slate-300' />
          <span className='size-2 rounded-full bg-slate-300' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
