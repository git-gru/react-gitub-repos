import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "../feataures/repos/reposSlice";

export default configureStore({
  reducer: {
    repos: reposReducer,
  },
});
