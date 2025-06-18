import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./user.types";

const initialState: UserState = {
  userName: "Lucas Santana",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
