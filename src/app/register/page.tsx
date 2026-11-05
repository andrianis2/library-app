"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/authAPI";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(8, "Nomor handphone tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => router.replace("/login"),
  });
  const errors = form.formState.errors;

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
        <h1 className="text-center text-xl font-semibold">Register</h1>
        <p className="mt-2 text-center text-xs text-gray-500">
          Create your account to start borrowing books.
        </p>

        <form
          onSubmit={form.handleSubmit((values) =>
            mutation.mutate({
              name: values.name,
              email: values.email,
              phone: values.phone,
              password: values.password,
              password_confirmation: values.confirmPassword,
            })
          )}
          className="mt-6 space-y-3.5"
        >
          <div>
            <Label htmlFor="name" className="text-xs">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              {...form.register("name")}
              className="mt-1 h-9 rounded-lg"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...form.register("email")}
              className="mt-1 h-9 rounded-lg"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs">Nomor Handphone</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...form.register("phone")}
              className="mt-1 h-9 rounded-lg"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-xs">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...form.register("password")}
              className="mt-1 h-9 rounded-lg"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-xs">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...form.register("confirmPassword")}
              className="mt-1 h-9 rounded-lg"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {mutation.isError && (
            <p role="alert" className="text-xs text-red-600">
              {mutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-9 w-full rounded-full bg-blue-600 text-xs hover:bg-blue-700"
          >
            {mutation.isPending ? "Registering..." : "Submit"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
