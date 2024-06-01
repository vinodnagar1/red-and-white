import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userlogin(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.user = action.payload;
    },
    userlogout(state, action) {
      state.user = null;
    },
  },
});

export const { userlogin, userlogout } = userSlice.actions;

export default userSlice.reducer;
