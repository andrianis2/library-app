import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryFilterReducer from "./category-filter-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categoryFilter: categoryFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;