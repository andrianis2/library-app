import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nama wajib diisi')
      .min(3, 'Nama minimal 3 karakter'),

    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),

    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(6, 'Password minimal 6 karakter'),

    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak sama',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
