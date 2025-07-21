import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Parametrli API çağırışı
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://backend-kmti.onrender.com/posts`,{
            params:category
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const searchPosts = createAsyncThunk(
  "posts/search",
  async (formState, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://backend-kmti.onrender.com/search-advanced", formState);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Axtarış zamanı xəta baş verdi.");
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    searchResults:[],
    loading: false,
    error: null,
    showSearchPage:false,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
   showSearch: (state) => {
  state.showSearchPage = true
},
closeSearch:(state) => {
  state.showSearchPage = false,
  state.searchResults=[]
},
  },
  extraReducers: (builder) => {
  builder
    .addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;

      const newPosts = action.payload;
      const existingIds = new Set(state.posts.map(post => post._id));
      const filteredNewPosts = newPosts.filter(post => !existingIds.has(post._id));

      state.posts = [...state.posts, ...filteredNewPosts];
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(searchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(searchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload; 
      console.log(action.payload)
      console.log(state.searchResults)
     
    })
    .addCase(searchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

});
export const { clearPosts,showSearch,closeSearch } = postsSlice.actions;
export default postsSlice.reducer;
