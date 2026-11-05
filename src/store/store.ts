import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryFilterReducer from "./category-filter-slice";
import cartReducer from "@/store/cart-slice";
import profileUIReducer from "./profile-ui-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categoryFilter: categoryFilterReducer,
    cart: cartReducer,
    profileUI: profileUIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;