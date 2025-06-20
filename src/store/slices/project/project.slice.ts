import { createSlice } from "@reduxjs/toolkit";
import { ProjectState } from "./project.types";

const initialState: ProjectState = {
  selectedProject: {
    id: "",
    name: "",
    description: "",
    color: "",
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { selectProject } = projectSlice.actions;
export default projectSlice.reducer;
