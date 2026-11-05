import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryFilterState {
  selectedCategoryId: number | null;
  selectedRatings: number[];
}

const initialState: CategoryFilterState = {
  selectedCategoryId: null,
  selectedRatings: [],
};

const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },

    toggleSelectedRating: (state, action: PayloadAction<number>) => {
      const rating = action.payload;

      if (state.selectedRatings.includes(rating)) {
        state.selectedRatings = state.selectedRatings.filter(
          (item) => item !== rating
        );
      } else {
        state.selectedRatings.push(rating);
      }
    },

    resetCategoryFilters: (state) => {
      state.selectedCategoryId = null;
      state.selectedRatings = [];
    },
  },
});

export const {
  setSelectedCategory,
  toggleSelectedRating,
  resetCategoryFilters,
} = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;