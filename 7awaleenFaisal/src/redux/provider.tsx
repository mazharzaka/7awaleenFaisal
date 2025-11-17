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

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxWrapper>{children}</ReduxWrapper>
    </Provider>
  );
}
