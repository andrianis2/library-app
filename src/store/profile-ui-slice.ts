import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileTab = "profile" | "borrowed" | "reviews";

interface ProfileUIState {
  activeTab: ProfileTab;
  borrowedFilter: string;
  search: string;
  reviewModalOpen: boolean;
  selectedLoanId: number | null;
  selectedRating: number;
}

const initialState: ProfileUIState = {
  activeTab: "profile",
  borrowedFilter: "All",
  search: "",
  reviewModalOpen: false,
  selectedLoanId: null,
  selectedRating: 5,
};

const profileUISlice = createSlice({
  name: "profileUI",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<ProfileTab>) {
      state.activeTab = action.payload;
    },
    setBorrowedFilter(state, action: PayloadAction<string>) {
      state.borrowedFilter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    openReviewModal(
      state,
      action: PayloadAction<number>
    ) {
      state.reviewModalOpen = true;
      state.selectedLoanId = action.payload;
      state.selectedRating = 5;
    },
    closeReviewModal(state) {
      state.reviewModalOpen = false;
      state.selectedLoanId = null;
    },
    setSelectedRating(state, action: PayloadAction<number>) {
      state.selectedRating = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setBorrowedFilter,
  setSearch,
  openReviewModal,
  closeReviewModal,
  setSelectedRating,
} = profileUISlice.actions;

export default profileUISlice.reducer;