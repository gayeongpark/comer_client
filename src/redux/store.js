import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    authUser: authReducer,
  },
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
