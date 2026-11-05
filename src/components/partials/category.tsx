'use client';

//import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categories } from '@/constant/category-data';
//import { getCategories } from '@/services/category-service';
import { useBookFilterStore } from '@/store/book-filter-store';

export function Category() {
  const selectedCategoryId = useBookFilterStore(
    (state) => state.selectedCategoryId
  );

  const setSelectedCategory = useBookFilterStore(
    (state) => state.setSelectedCategory
  );

  const resetCategory = useBookFilterStore((state) => state.resetCategory);

  /* const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  }); 

  if (isLoading) {
    return <p className='py-8 text-center'>Loading kategori...</p>;
  }

  if (isError) {
    return (
      <p className='py-8 text-center text-red-600'>Kategori gagal dimuat</p>
    );
  }*/

  return (
    <section className='py-8'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {categories.map((category) => {
            const isSelected = selectedCategoryId === category.id;

            return (
              <Button
                key={category.id}
                type='button'
                variant='outline'
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedCategory(Number(category.id), category.name)
                }
                className={cn(
                  'h-16 justify-start rounded-xl',
                  isSelected &&
                    'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:text-white'
                )}
              >
                <Image
                  src={`/icons/${category.icon}`}
                  alt='category'
                  width={51.2}
                  height={51.2}
                  className='max-md:h-8 max-md:w-35.25'
                />

                {category.name}
              </Button>
            );
          })}
        </div>

        {selectedCategoryId !== null && (
          <Button
            type='button'
            variant='link'
            className='mt-3 px-0 text-blue-600'
            onClick={resetCategory}
          >
            Tampilkan semua rekomendasi
          </Button>
        )}
      </div>
    </section>
  );
}
