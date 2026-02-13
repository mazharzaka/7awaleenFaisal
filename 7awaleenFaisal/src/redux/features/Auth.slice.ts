import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface UserState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: UserState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      
      try {
        const decoded = jwtDecode(accessToken);
        state.user = decoded;
      } catch (error) {
        state.user = null;
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      }
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        Cookies.remove("token");
        Cookies.remove("userType");
      }
    },
    loadToken: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (token) {
            state.token = token;
            if (refreshToken) state.refreshToken = refreshToken;
            
            try {
                const decoded = jwtDecode(token);
                state.user = decoded;
            } catch (error) {
                state.user = null;
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
            }
        }
      }
    },
  },
});

export const { setCredentials, logout, loadToken } = authSlice.actions;
export default authSlice.reducer;
