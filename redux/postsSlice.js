import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


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
    const hasValidValue = Object.values(formState).some(value => value !== "" && value !== null && value !== undefined);

    if (!hasValidValue) {
      toast.error("Zəhmət olmasa axtarış kriteriyası daxil edin.");
      return rejectWithValue("Boş axtarış göndərilə bilməz.");
    }

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
    search_loading:false,
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
      state.search_loading = true;
      state.error = null;
    })
    .addCase(searchPosts.fulfilled, (state, action) => {
      state.search_loading = false;
      state.searchResults = action.payload; 
      if(action.payload.length <= 0){
        toast.info("Nəticə tapılmadı")
      }else{
        state.showSearchPage=true
      }
      console.log(action.payload)
      console.log(state.searchResults)
     
    })
    .addCase(searchPosts.rejected, (state, action) => {
      state.search_loading = false;
      state.error = action.payload;
    });
}

});
export const { clearPosts,showSearch,closeSearch } = postsSlice.actions;
export default postsSlice.reducer;
