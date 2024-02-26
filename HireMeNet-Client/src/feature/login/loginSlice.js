import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    token: "", // Add token field
    user: null, // Store user data here
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload.token; // Assuming token is part of payload
      state.user = action.payload.user; // Assuming user data is also part of payload
    },
    logout(state) {
      (state.loggedIn = false), (state.token = "");
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectedUser = (state) => state.user.user;

export default userSlice.reducer;
