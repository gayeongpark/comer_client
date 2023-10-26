import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
