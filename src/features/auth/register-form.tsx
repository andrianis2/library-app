'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/auth-schema';

import {
  registerUser,
  type RegisterPayload,
} from '@/features/auth/services/auth-service';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      console.log('Register berhasil:', response);

      router.replace('/login');
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          'Registrasi gagal. Silakan coba kembali.';

        setError('root', {
          type: 'server',
          message,
        });

        console.error('Register gagal:', error.response?.data);
        return;
      }

      setError('root', {
        type: 'server',
        message: 'Terjadi kesalahan yang tidak diketahui.',
      });
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const payload: RegisterPayload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    registerMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nama lengkap</Label>

        <Input
          id='name'
          type='text'
          placeholder='Masukkan nama lengkap'
          autoComplete='name'
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />

        {errors.name && (
          <p className='text-sm text-destructive'>{errors.name.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>

        <Input
          id='email'
          type='email'
          placeholder='nama@email.com'
          autoComplete='email'
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />

        {errors.email && (
          <p className='text-sm text-destructive'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>

        <Input
          id='password'
          type='password'
          placeholder='Minimal 6 karakter'
          autoComplete='new-password'
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />

        {errors.password && (
          <p className='text-sm text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Konfirmasi password</Label>

        <Input
          id='confirmPassword'
          type='password'
          placeholder='Masukkan kembali password'
          autoComplete='new-password'
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <p className='text-sm text-destructive'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errors.root && (
        <div
          role='alert'
          className='rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive'
        >
          {errors.root.message}
        </div>
      )}

      <Button
        type='submit'
        className='w-full'
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Mendaftarkan...' : 'Daftar'}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        Sudah mempunyai akun?{' '}
        <Link
          href='/login'
          className='font-medium text-primary hover:underline'
        >
          Login
        </Link>
      </p>
    </form>
  );
}
