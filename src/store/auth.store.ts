import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface UserProp {
  email: string;
}

interface AuthStore {
  user: UserProp | null;
  isAuthenticated: boolean;
  login: (user: UserProp) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        login: (user) =>
          set({
            user,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
