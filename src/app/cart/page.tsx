
"use client";

import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, BookOpen } from "lucide-react";

import type { RootState, AppDispatch } from "@/store/store";
import {
  toggleCartItem,
  selectAllCartItems,
} from "@/store/cart-slice";

import {
  getCartItems,
  removeCartItem,
} from "@/services/cart-service";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Sesuaikan path ini dengan authSlice proyek Anda.
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const selectedItemIds = useSelector(
    (state: RootState) => state.cart.selectedItemIds
  );

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart-items"],
    queryFn: () => {
      if (!token) {
        throw new Error("Silakan login terlebih dahulu");
      }

      return getCartItems(token);
    },
    enabled: Boolean(token),
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => {
      if (!token) {
        throw new Error("Silakan login terlebih dahulu");
      }

      return removeCartItem(itemId, token);
    },

    onSuccess: (_, itemId) => {
      dispatch(
        selectAllCartItems(
          selectedItemIds.filter((id) => id !== itemId)
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },
  });

  const selectedItems = useMemo(
    () =>
      items.filter((item) =>
        selectedItemIds.includes(item.id)
      ),
    [items, selectedItemIds]
  );

  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedItemIds.includes(item.id));

  function handleSelectAll(checked: boolean) {
    dispatch(
      selectAllCartItems(
        checked ? items.map((item) => item.id) : []
      )
    );
  }

  function handleBorrow() {
    if (selectedItems.length === 0) return;

    // Tahap berikutnya: hubungkan ke endpoint peminjaman backend.
    router.push("/loans/checkout");
  }

  if (!token) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-24 text-center">
        <BookOpen className="mx-auto mb-4 text-slate-400" size={45} />
        <h1 className="text-2xl font-bold">Login diperlukan</h1>
        <p className="mt-2 text-slate-500">
          Silakan login untuk melihat keranjang buku.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/login">Login</Link>
        </Button>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Skeleton className="mb-8 h-10 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="mt-5 h-40 w-full" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">Cart gagal dimuat</h1>
        <p className="mt-2 text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Terjadi kesalahan"}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[650px] bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10">

        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          My Cart
        </h1>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen
              size={48}
              className="mx-auto mb-4 text-slate-300"
            />

            <h2 className="text-xl font-semibold">
              Keranjang masih kosong
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Silakan pilih buku yang ingin dipinjam.
            </p>

            <Button asChild className="mt-6 rounded-full">
              <Link href="/categories">Explore Books</Link>
            </Button>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_280px]">

            {/* Cart List */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true)
                  }
                />

                <span className="text-sm font-medium">
                  Select All
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                {items.map((item) => {
                  const selected = selectedItemIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 py-5 first:pt-0"
                    >
                      <div className="pt-1">
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() =>
                            dispatch(toggleCartItem(item.id))
                          }
                        />
                      </div>

                      <Link
                        href={`/books/${item.book.id}`}
                        className="relative h-[130px] w-[90px] shrink-0 overflow-hidden bg-slate-100"
                      >
                        {item.book.coverImage && (
                          <Image
                            src={item.book.coverImage}
                            alt={item.book.title}
                            fill
                            sizes="90px"
                            className="object-cover"
                          />
                        )}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block rounded border px-2 py-1 text-xs text-slate-600">
                          {item.book.category?.name || "Category"}
                        </span>

                        <Link href={`/books/${item.book.id}`}>
                          <h3 className="mt-2 font-semibold text-slate-900 hover:text-blue-600">
                            {item.book.title}
                          </h3>
                        </Link>

                        <p className="mt-2 text-sm text-slate-500">
                          {item.book.author?.name || "Unknown Author"}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          Jumlah: {item.quantity}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-500"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(item.id)}
                        aria-label="Hapus buku dari keranjang"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Loan Summary */}
            <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Loan Summary
              </h2>

              <div className="my-6 flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Book</span>
                <span className="font-semibold">
                  {selectedItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  Items
                </span>
              </div>

              <Separator className="mb-5" />

              <Button
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
                disabled={selectedItems.length === 0}
                onClick={handleBorrow}
              >
                Borrow Book
              </Button>

              <p className="mt-3 text-center text-xs text-slate-500">
                {selectedItems.length} buku dipilih
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
