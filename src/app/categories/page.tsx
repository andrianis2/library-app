"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Star, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { RootState, AppDispatch } from "@/store/store";
import {
  setSelectedCategory,
  toggleSelectedRating,
} from "@/store/category-filter-slice";

import {
  getCategories,
  getBooksByCategory,
} from "@/services/category-service";

import { Checkbox } from "@/components/ui/checkbox";

export default function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategoryId = useSelector(
    (state: RootState) =>
      state.categoryFilter.selectedCategoryId
  );

  const selectedRatings = useSelector(
    (state: RootState) =>
      state.categoryFilter.selectedRatings
  );

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["category-books", selectedCategoryId],
    queryFn: () =>
      selectedCategoryId
        ? getBooksByCategory(selectedCategoryId)
        : getAllBooks(),
  });

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some(
          (rating) => Math.floor(Number(book.rating)) === rating
        );

      return matchesRating;
    });
  }, [books, selectedRatings]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Book List
      </h1>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-[230px_1fr]">

        {/* Sidebar */}
        <aside className="h-fit rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-5 font-bold">FILTER</h2>

          <h3 className="mb-3 font-semibold">Category</h3>

          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategoryId === category.id}
                  onCheckedChange={(checked) =>
                    dispatch(
                      setSelectedCategory(
                        checked ? category.id : null
                      )
                    )
                  }
                />

                <span className="text-sm">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          <div className="my-5 border-t" />

          <h3 className="mb-4 font-semibold">Rating</h3>

          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="mb-4 flex items-center gap-2">
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() =>
                  dispatch(toggleSelectedRating(rating))
                }
              />

              <Star
                size={16}
                className="fill-amber-400 text-amber-400"
              />

              <span className="text-sm">{rating}</span>
            </div>
          ))}
        </aside>

        {/* Book Grid */}
        <section>
          {isLoading ? (
            <p>Loading books...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[3/4] bg-slate-100">
                    {book.coverImage && (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="space-y-2 p-3">
                    <h3 className="line-clamp-1 font-semibold">
                      {book.title}
                    </h3>

                    <p className="line-clamp-1 text-sm text-slate-500">
                      {book.author?.name}
                    </p>

                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={15}
                        className="fill-amber-400 text-amber-400"
                      />
                      {Number(book.rating || 0).toFixed(1)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}