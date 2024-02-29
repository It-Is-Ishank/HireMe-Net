import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    data: null, // Store user data here
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.data = action.payload.data; // Assuming user data is also part of payload
    },
    logout(state) {
      state.loggedIn = false;
      state.data = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectedUser = (state) => state.user.user;

export default userSlice.reducer;
