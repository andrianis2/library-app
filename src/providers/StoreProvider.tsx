"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthHydration from "@/components/auth/auth-hydration";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydration />
      {children}
    </Provider>
  );
}