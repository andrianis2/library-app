import Hero from '../components/partials/hero';
import Navbar from '../components/partials/navbar';
import { Category } from '../components/partials/category';
import { Recommendation } from '@/components/partials/recommended';
import { PopularAuthors } from '@/components/partials/author';
import { Footer } from '@/components/partials/footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <Recommendation />
      <PopularAuthors />
      <Footer />
    </div>
  );
}
