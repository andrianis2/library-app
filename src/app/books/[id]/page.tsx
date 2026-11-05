
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Star,
  ChevronRight,
  CalendarDays,
  Library,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { getBookById } from "@/services/book-service";
import type { Review } from "@/types/book";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { useSelector } from "react-redux";
import { toast } from "sonner";

import { addCartItem } from "@/services/cart-service";
import type { RootState } from "@/store/store";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300"
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          {review.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {review.user?.name || "Pengguna"}
          </p>

          <p className="text-xs text-slate-500">
            {new Date(review.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <RatingStars rating={review.star} />
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {review.comment}
      </p>
    </div>
  );
}

export default function BookDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book-detail", id],
    queryFn: () => getBookById(id),
    enabled: Boolean(id),
  });

  const addToCartMutation = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("Silakan login terlebih dahulu");
      }

      if (!book) {
        throw new Error("Buku tidak ditemukan");
      }

      return addCartItem(book.id, token);
    },

    onSuccess: () => {
      toast.success("Buku berhasil ditambahkan ke keranjang");

      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });

      router.push("/cart");
    },

    onError: (error: Error) => {
      const message = error.message;

      if (message.toLowerCase().includes("already in cart")) {
        toast.warning("Buku sudah ada di keranjang");
      } else if (message.toLowerCase().includes("out of stock")) {
        toast.error("Stok buku sedang habis");
      } else if (message.toLowerCase().includes("book not found")) {
        toast.error("Buku tidak ditemukan");
      } else {
        toast.error(message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Skeleton className="mb-8 h-8 w-64" />
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <Skeleton className="h-[390px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <BookOpen className="mx-auto mb-4 text-slate-400" size={48} />

        <h2 className="text-2xl font-bold text-slate-800">
          Buku tidak ditemukan
        </h2>

        <p className="mt-2 text-slate-500">
          {error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengambil data buku."}
        </p>

        <Button asChild className="mt-6">
          <Link href="/">Kembali ke katalog</Link>
        </Button>
      </div>
    );
  }

  const available = book.availableCopies > 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>

          <ChevronRight size={15} />

          <Link href="/categories" className="text-blue-600 hover:underline">
             {book.category?.name}
          </Link>

          <ChevronRight size={15} />

          <span className="font-medium text-slate-800">
            {book.title}
          </span>
        </nav>

        {/* Book Information */}
        <section className="grid gap-8 md:grid-cols-[280px_1fr]">

          {/* Book Cover */}
          <div className="mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[3/4] overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 280px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-4">

            <div>
              <Badge variant="outline" className="mb-3">
                {book.category?.name || "Uncategorized"}
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {book.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {book.author?.name || "Unknown Author"}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <RatingStars rating={book.rating} />

              <span className="text-sm font-semibold text-slate-800">
                {Number(book.rating).toFixed(1)}
              </span>

              <span className="text-sm text-slate-500">
                ({book.reviewCount} Reviews)
              </span>
            </div>

            {/* Statistics */}
            <div className="grid max-w-xl grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-4">
              <div className="pr-4">
                <p className="text-2xl font-bold text-slate-900">
                  {book.availableCopies}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Stok tersedia
                </p>
              </div>

              <div className="px-4">
                <p className="text-2xl font-bold text-slate-900">
                  {book.rating}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Rating
                </p>
              </div>

              <div className="pl-4">
                <p className="text-2xl font-bold text-slate-900">
                  {book.reviewCount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Reviews
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="flex flex-wrap gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Library size={16} />
                Total koleksi: {book.totalCopies}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                Tahun terbit: {book.publishedYear}
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">
                Description
              </h2>

              <p className="text-sm leading-7 text-slate-600">
                {book.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                className="w-full"
                disabled={!token || addToCartMutation.isPending}
                onClick={() => addToCartMutation.mutate()}
              >
                {addToCartMutation.isPending
                  ? "Adding..."
                  : "Add to Cart"}
              </Button>

              <Button
                className="min-w-40 rounded-full bg-blue-600 hover:bg-blue-700"
                disabled={!available}
              >
                <BookOpen size={17} className="mr-2" />
                {available ? "Borrow Book" : "Stok Habis"}
              </Button>
            </div>

            {!available && (
              <p className="text-sm text-red-500">
                Maaf, buku ini sedang tidak tersedia untuk dipinjam.
              </p>
            )}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Reviews */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Review
            </h2>

            <div className="mt-2 flex items-center gap-2">
              <RatingStars rating={book.rating} />

              <span className="font-semibold text-slate-800">
                {Number(book.rating).toFixed(1)}
              </span>

              <span className="text-sm text-slate-500">
                ({book.reviewCount} Ulasan)
              </span>
            </div>
          </div>

          {book.reviews?.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {book.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">
              Belum ada review untuk buku ini.
            </div>
          )}
        </section>

        <Separator className="my-12" />

        {/* Related Books */}
        <section className="pb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Related Books
          </h2>

          <p className="text-sm text-slate-500">
            Buku lainnya akan ditampilkan berdasarkan kategori{" "}
            <span className="font-semibold text-slate-800">
              {book.category?.name}
            </span>.
          </p>

          {/* Bagian ini dapat dihubungkan ke API rekomendasi buku */}
        </section>
      </div>
    </main>
  );
}
