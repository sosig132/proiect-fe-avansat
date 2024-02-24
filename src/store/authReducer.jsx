import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: ''
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      //localStorage.removeItem('isAuthenticated');
      auth.signOut();
      
    },
  },
});

export default authSlice.reducer;
export const { setIsAuthenticated, logout } = authSlice.actions;