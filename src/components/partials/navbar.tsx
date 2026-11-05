"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ShoppingBag,
  ChevronDown,
  UserRound,
  BookOpen,
  LogOut,
} from "lucide-react";

import type { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/features/auth/authSlice";

export default function Navbar() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sementara gunakan data contoh sesuai desain.
  // Ganti dengan data user dari API setelah tersedia.
  const userName = "John Doe";
  const avatarUrl = "https://i.pravatar.cc/100?img=12";
  const loanCount = 1;

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    router.replace("/login");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    if (query) {
      router.push(`/catalog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center gap-5 px-5 md:px-8">
        {/* Logo */}
        <Link
          href={token ? "/catalog" : "/"}
          className="flex shrink-0 items-center gap-3"
          aria-label="Booky Home"
        >
          <span className="text-5xl leading-none text-blue-600">✺</span>
          <span className="text-3xl font-bold tracking-tight text-gray-950">
            Booky
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto hidden w-full max-w-[500px] md:block"
        >
          <div className="flex h-11 items-center gap-2 rounded-full border border-gray-300 px-4 transition focus-within:border-blue-500">
            <Search className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search book"
              aria-label="Search book"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          {token ? (
            <>
              {/* Loan / borrowing icon */}
              <Link
                href="/loans"
                aria-label="My loans"
                className="relative rounded-lg p-2 text-gray-950 hover:bg-gray-100"
              >
                <ShoppingBag className="h-6 w-6" />
                {loanCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-semibold text-white">
                    {loanCount}
                  </span>
                )}
              </Link>

              {/* User dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-expanded={dropdownOpen}
                  className="flex items-center gap-3 rounded-full py-1 pl-1 hover:bg-gray-50"
                >
                  <img
                    src={avatarUrl}
                    alt="Foto profil"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <span className="hidden text-base font-medium text-gray-950 sm:block">
                    {userName}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="border-b px-3 py-2">
                      <p className="font-medium text-gray-900">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Akun Booky
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100"
                    >
                      <UserRound className="h-4 w-4" />
                      Profil Saya
                    </Link>

                    <Link
                      href="/loans"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100"
                    >
                      <BookOpen className="h-4 w-4" />
                      Peminjaman Saya
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Search untuk layar mobile */}
      {token && (
        <form onSubmit={handleSearch} className="px-5 pb-4 md:hidden">
          <div className="flex h-10 items-center gap-2 rounded-full border border-gray-300 px-4">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search book"
              aria-label="Search book"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </form>
      )}
    </header>
  );
}
