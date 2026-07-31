'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/login-schema';

import { login } from '@/features/auth/services/auth-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      console.log('Response login:', data);

      localStorage.setItem('token', data.token);

      router.replace('/');
      router.refresh();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error('Login gagal:', error.response?.data);
      } else {
        console.error('Login gagal:', error);
      }
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log('Form dikirim:', values);
    loginMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium'>
          Email
        </label>

        <Input
          id='email'
          type='email'
          placeholder='email@example.com'
          {...register('email')}
        />

        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='password' className='text-sm font-medium'>
          Password
        </label>

        <Input
          id='password'
          type='password'
          placeholder='Masukkan password'
          {...register('password')}
        />

        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      {loginMutation.isError && (
        <p className='text-sm text-red-500'>Email atau password salah.</p>
      )}

      <Button
        type='submit'
        className='w-full bg-[#C12116]'
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Sedang login...' : 'Login'}
      </Button>
    </form>
  );
}
