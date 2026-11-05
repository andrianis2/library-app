"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setToken } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store/store";
import { loginUser } from "@/services/authAPI";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (result) => {
      const token =
        result.token ??
        result.access_token ??
        result.data?.token ??
        result.data?.access_token;

      if (token) {
        dispatch(setToken(token));
        router.replace("/");
      }
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 text-gray-900">
      <section className="w-full max-w-[344px]">
        <Link
          href="/"
          className="mb-5 block text-center text-sm font-semibold"
          aria-label="Booky home"
        >
          Booky
        </Link>
        <h1 className="text-center text-xl font-semibold">Login</h1>
        <p className="mt-2 text-center text-xs text-gray-500">
          Welcome back! Log in to continue borrowing books.
        </p>

        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="mt-6 space-y-4"
        >
          <div>
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...form.register("email")}
              className="mt-1 h-9 rounded-lg"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-xs">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...form.register("password")}
                className="h-9 rounded-lg pr-10"
              />
              <button
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {mutation.isError && (
            <p role="alert" className="text-xs text-red-600">
              {mutation.error.message}
            </p>
          )}

          {mutation.isSuccess &&
            !mutation.data.token &&
            !mutation.data.access_token &&
            !mutation.data.data?.token &&
            !mutation.data.data?.access_token && (
              <p role="alert" className="text-xs text-red-600">
                Login berhasil, tetapi token tidak ditemukan pada respons API.
                Periksa struktur respons backend.
              </p>
            )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-9 w-full rounded-full bg-blue-600 text-xs hover:bg-blue-700"
          >
            {mutation.isPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
