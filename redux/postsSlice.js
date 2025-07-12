import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Parametrli API çağırışı
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts`,{
            params:category
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
       state.posts = [...state.posts, ...action.payload];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
