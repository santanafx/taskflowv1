import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice";
import projectReducer from "./slices/project/project.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
