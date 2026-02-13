"use client";

import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { loadToken } from "./features/Auth.slice";
function ReduxWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken()); // 🔑 جلب التوكن من localStorage بعد mount
  }, [dispatch]);

  return <>{children}</>;
}

import { GoogleOAuthProvider } from "@react-oauth/google";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <Provider store={store}>
        <ReduxWrapper>{children}</ReduxWrapper>
      </Provider>
    </GoogleOAuthProvider>
  );
}
