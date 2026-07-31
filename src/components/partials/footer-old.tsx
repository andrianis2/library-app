'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <Link href='/' className='brand'>
        <span className='brand-mark'>✺</span>Booky
      </Link>
      <p>
        Discover inspiring stories & timeless knowledge, ready to borrow
        anytime. Explore online or visit our nearest library branch.
      </p>
      <b>Follow on Social Media</b>
      <div className='socials'>
        <a href='#' aria-label='Facebook'>
          f
        </a>
        <a href='#' aria-label='Instagram'>
          ◎
        </a>
        <a href='#' aria-label='LinkedIn'>
          in
        </a>
      </div>
    </footer>
  );
}
