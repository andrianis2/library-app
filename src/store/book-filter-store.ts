import { create } from 'zustand';

type BookFilterState = {
  selectedCategoryId: number | null;
  selectedCategoryName: string;
  setSelectedCategory: (id: number, name: string) => void;
  resetCategory: () => void;
};

export const useBookFilterStore = create<BookFilterState>((set) => ({
  selectedCategoryId: null,
  selectedCategoryName: 'Semua',

  setSelectedCategory: (id, name) =>
    set({
      selectedCategoryId: id,
      selectedCategoryName: name,
    }),

  resetCategory: () =>
    set({
      selectedCategoryId: null,
      selectedCategoryName: 'Semua',
    }),
}));
