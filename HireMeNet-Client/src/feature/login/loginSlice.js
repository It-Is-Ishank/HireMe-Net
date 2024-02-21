import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState : {
    user: null
  },
  reducers: {
    login(state, actions) {
      state.user = actions.payload;
      console.log(state.user)
    },
    logout(state){
      state.user=null;
    }
  },
});

export const { login,logout } = userSlice.actions;

export const selectedUser = (state) => state.user.user

export default userSlice.reducer;