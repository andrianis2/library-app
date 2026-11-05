"use client";

import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import type { RootState } from "@/store";

import {
  getMyProfile,
  getMyLoans,
  getMyReviews,
} from "@/services/me-service";

import {
  setActiveTab,
  setBorrowedFilter,
  setSearch,
  openReviewModal,
  closeReviewModal,
  setSelectedRating,
} from "@/store/profile-ui-slice";

import {
  UserProfile,
  Loan,
  UserReview,
} from "@/types/me";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Search,
  X,
  Star,
  UserRound,
  BookOpen,
  MessageSquare,
  Loader2,
} from "lucide-react";

type Tab = "profile" | "borrowed" | "reviews";

function unwrapObject<T>(result: any): T {
  return (
    result?.data?.user ??
    result?.data ??
    result?.user ??
    result
  ) as T;
}

function unwrapArray<T>(result: any): T[] {
  const candidates = [
    result?.data?.loans,
    result?.data?.reviews,
    result?.data?.items,
    result?.loans,
    result?.reviews,
    result?.items,
    result?.data,
  ];

  return candidates.find(Array.isArray) ?? [];
}

function formatDate(date?: string) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalizeStatus(status?: string) {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("return")) return "Returned";
  if (value.includes("overdue") || value.includes("late")) {
    return "Overdue";
  }

  return "Active";
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-50 text-green-600",
    Returned: "bg-green-50 text-green-600",
    Overdue: "bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function RatingStars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          className={
            value <= rating
              ? "fill-amber-500 text-amber-500"
              : "fill-gray-300 text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function BookInformation({
  book,
  date,
  duration,
}: {
  book: Loan["book"] | UserReview["book"];
  date?: string;
  duration?: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-sm bg-gray-100">
        {book?.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="min-w-0">
        {book?.category?.name && (
          <span className="inline-block rounded border px-2 py-0.5 text-xs">
            {book.category.name}
          </span>
        )}

        <h3 className="mt-2 font-semibold">
          {book?.title ?? "Book title"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {book?.author?.name ?? "Author name"}
        </p>

        {date && (
          <p className="mt-2 text-xs font-medium text-gray-700">
            {formatDate(date)}
            {duration ? ` · Duration ${duration} Days` : ""}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: RootState) => state.auth.token
  );

    console.log("TOKEN:", token);
    console.log("TOKEN TYPE:", typeof token);

  const {
    activeTab,
    borrowedFilter,
    search,
    reviewModalOpen,
    selectedLoanId,
    selectedRating,
  } = useSelector((state: RootState) => state.profileUI);

  const [reviewComment, setReviewComment] = useState("");

  // PROFILE QUERY
  const profileQuery = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile(token!),
    enabled: Boolean(token),
    select: (result) => unwrapObject<UserProfile>(result),
  });

  // BORROWED LIST QUERY
  const loansQuery = useQuery({
    queryKey: ["my-loans", 1, 20],
    queryFn: () => getMyLoans(token!, 1, 20),
    enabled: Boolean(token) && activeTab === "borrowed",
    select: (result) => unwrapArray<Loan>(result),
  });

  // REVIEWS QUERY
  const reviewsQuery = useQuery({
    queryKey: ["my-reviews", 1, 20],
    queryFn: () => getMyReviews(token!, 1, 20),
    enabled: Boolean(token) && activeTab === "reviews",
    select: (result) => unwrapArray<UserReview>(result),
  });

  const profile = profileQuery.data;
  const loans = loansQuery.data ?? [];
  const reviews = reviewsQuery.data ?? [];

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const status = normalizeStatus(loan.status);

      const matchStatus =
        borrowedFilter === "All" ||
        status === borrowedFilter;

      const matchSearch = (
        loan.book?.title ?? ""
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [loans, borrowedFilter, search]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) =>
      (review.book?.title ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [reviews, search]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <UserRound size={16} />,
    },
    {
      id: "borrowed",
      label: "Borrowed List",
      icon: <BookOpen size={16} />,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MessageSquare size={16} />,
    },
  ];

  if (!token) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Login Required
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Silakan login untuk melihat halaman akun.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10">

          {/* TABS */}
          <div className="mb-5 flex max-w-xl rounded-xl bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  dispatch(setActiveTab(tab.id));
                  dispatch(setSearch(""));
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm transition ${
                  activeTab === tab.id
                    ? "bg-white font-semibold shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <span className="hidden sm:block">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* PROFILE */}
          {activeTab === "profile" && (
            <section>
              <h1 className="mb-5 text-2xl font-semibold">
                Profile
              </h1>

              {profileQuery.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : profileQuery.isError ? (
                <p className="text-sm text-red-500">
                  Gagal mengambil data profile.
                </p>
              ) : (
                <div className="max-w-xl rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="mb-5">
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <UserRound size={28} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span>Name</span>
                      <strong className="text-right">
                        {profile?.name ?? "-"}
                      </strong>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span>Email</span>
                      <strong className="break-all text-right">
                        {profile?.email ?? "-"}
                      </strong>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span>Nomor Handphone</span>
                      <strong className="text-right">
                        {profile?.phone ?? "-"}
                      </strong>
                    </div>
                  </div>

                  <Button
                    className="mt-7 w-full rounded-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      alert(
                        "Endpoint update profile belum diberikan."
                      );
                    }}
                  >
                    Update Profile
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* BORROWED LIST */}
          {activeTab === "borrowed" && (
            <section>
              <h1 className="mb-5 text-2xl font-semibold">
                Borrowed List
              </h1>

              <div className="relative mb-4 max-w-md">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={17}
                />
                <Input
                  value={search}
                  onChange={(e) =>
                    dispatch(setSearch(e.target.value))
                  }
                  placeholder="Search book"
                  className="rounded-full pl-10"
                />
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {["All", "Active", "Returned", "Overdue"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() =>
                        dispatch(setBorrowedFilter(filter))
                      }
                      className={`rounded-full border px-4 py-2 text-sm ${
                        borrowedFilter === filter
                          ? "border-blue-600 text-blue-600"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>

              {loansQuery.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : loansQuery.isError ? (
                <p className="text-sm text-red-500">
                  Gagal mengambil daftar peminjaman.
                </p>
              ) : filteredLoans.length === 0 ? (
                <div className="rounded-xl border p-10 text-center text-gray-500">
                  Tidak ada data peminjaman.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLoans.map((loan) => {
                    const status = normalizeStatus(loan.status);

                    return (
                      <article
                        key={loan.id}
                        className="rounded-2xl border border-gray-100 p-4 shadow-sm sm:p-5"
                      >
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                          <div className="flex items-center gap-3 text-sm font-medium">
                            Status
                            <StatusBadge status={status} />
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            Due Date
                            <span className="rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
                              {formatDate(loan.dueDate)}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                          <BookInformation
                            book={loan.book}
                            date={loan.borrowDate}
                            duration={loan.duration}
                          />

                          <Button
                            className="rounded-full bg-blue-600 px-8 hover:bg-blue-700"
                            onClick={() =>
                              dispatch(openReviewModal(loan.id))
                            }
                          >
                            Give Review
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <section>
              <h1 className="mb-5 text-2xl font-semibold">
                Reviews
              </h1>

              <div className="relative mb-5 max-w-md">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={17}
                />
                <Input
                  value={search}
                  onChange={(e) =>
                    dispatch(setSearch(e.target.value))
                  }
                  placeholder="Search Reviews"
                  className="rounded-full pl-10"
                />
              </div>

              {reviewsQuery.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : reviewsQuery.isError ? (
                <p className="text-sm text-red-500">
                  Gagal mengambil reviews.
                </p>
              ) : filteredReviews.length === 0 ? (
                <div className="rounded-xl border p-10 text-center text-gray-500">
                  Belum ada review.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-xl border border-gray-100 p-5 shadow-sm"
                    >
                      <p className="border-b pb-3 text-xs font-medium text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>

                      <div className="border-b py-4">
                        <BookInformation book={review.book} />
                      </div>

                      <div className="pt-3">
                        <RatingStars rating={review.rating} />

                        <p className="mt-2 text-sm leading-6 text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* GIVE REVIEW MODAL */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => dispatch(closeReviewModal())}
              className="absolute right-5 top-5 text-gray-500 hover:text-black"
              aria-label="Close review dialog"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold">
              Give Review
            </h2>

            <div className="mt-5 text-center">
              <p className="mb-2 text-xs font-medium">
                Give Rating
              </p>

              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      dispatch(setSelectedRating(rating))
                    }
                    aria-label={`Rate ${rating} stars`}
                  >
                    <Star
                      size={25}
                      className={
                        rating <= selectedRating
                          ? "fill-amber-500 text-amber-500"
                          : "fill-gray-300 text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              value={reviewComment}
              onChange={(e) =>
                setReviewComment(e.target.value)
              }
              placeholder="Please share your thoughts about this book"
              className="mt-5 min-h-32 resize-none"
            />

            <Button
              className="mt-5 w-full rounded-full bg-blue-600"
              onClick={() => {
                alert(
                  `Review untuk loan ${selectedLoanId} belum dikirim karena endpoint POST review belum tersedia.`
                );
              }}
              disabled={!reviewComment.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}