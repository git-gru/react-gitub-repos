import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  repos: [],
  status: "idle",
  error: "",
  totalCount: 0,
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    reposEmptied: (state) => {
      state.repos = [];
      state.totalCount = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRepos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched repos to the array
        state.repos = action.payload.items;
        state.totalCount = action.payload.total_count;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async ({ q, page, per_page }) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${q}&page=${page}&per_page=${per_page}`
    );
    const jsonData = await res.json();

    return jsonData;
  }
);

export const selectAllRepos = (state) => state.repos.repos;

export const { reposEmptied } = reposSlice.actions;

export default reposSlice.reducer;
