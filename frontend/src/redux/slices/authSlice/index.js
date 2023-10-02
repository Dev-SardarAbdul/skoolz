import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.auth = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
