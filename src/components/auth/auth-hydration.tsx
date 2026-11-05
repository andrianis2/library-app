"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setToken } from "@/features/auth/authSlice";

export default function AuthHydration() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("booky_token");

    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
}