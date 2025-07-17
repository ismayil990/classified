import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { categories } from '../data/options';
import axios from 'axios';
import AdvancedSearch from '../src/components/AdvancedSearch';

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (arg,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`https://backend-kmti.onrender.com/categories/full`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  openCategoryMenu:false,
  categoryName:"Bütün elanlar",
  categories:[],
  loading:true,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    openCategorySheet: (state, action) => {
      state.openCategoryMenu =  true;
      console.log(state.openCategoryMenu)
    },
     closeCategorySheet: (state, action) => {
      state.openCategoryMenu = false
      console.log(state.openCategoryMenu)
    },
    toggleCategorySheet: (state) => {
      state.openCategoryMenu = !state.openCategoryMenu;
    },
    changeCategory:(state,action)=>{
      state.categoryName=action.payload.categoryName
      console.log(action.payload.categoryName)
    }
  },
   extraReducers: (builder) => {
      builder
        .addCase(getCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.loading = false;
         state.categories = action.payload;
         console.log(action.payload)
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const { openCategorySheet,closeCategorySheet,toggleCategorySheet,changeCategory} = categorySlice.actions;

export default categorySlice.reducer;
