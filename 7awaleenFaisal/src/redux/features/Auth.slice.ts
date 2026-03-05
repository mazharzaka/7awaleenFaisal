import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface UserState {
  token: string | null;
  refreshToken: string | null;
  user: {
    userId: string;
    name: string;
    userType: string;
    role: "CUSTOMER" | "DRIVER" | "ADMIN";
    isApproved: boolean;
    accountStatus: "PENDING" | "APPROVED" | "REJECTED";
    isOnline: boolean;
  } | null;
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
      const { accessToken, refreshToken, user } = action.payload;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      
      if (user) {
        state.user = user;
      } else {
        try {
          const decoded = jwtDecode(accessToken) as any;
          state.user = decoded;
        } catch (error) {
          state.user = null;
        }
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        
        // Set Cookies for Middleware
        Cookies.set("token", accessToken, { expires: 1 });
        if (state.user) {
          Cookies.set("userType", state.user.userType || "customer", { expires: 1 });
          Cookies.set("role", state.user.role || "CUSTOMER", { expires: 1 });
          Cookies.set("isApproved", String(state.user.isApproved || false), { expires: 1 });
        }
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
        Cookies.remove("role");
        Cookies.remove("isApproved");
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
                const decoded = jwtDecode(token) as any;
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
