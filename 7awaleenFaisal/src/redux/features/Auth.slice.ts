import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
      state.user = action.payload.user;
      console.log(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    loadToken: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) state.token = token;
      }
    },
  },
});

export const { setCredentials, logout, loadToken } = authSlice.actions;
export default authSlice.reducer;
