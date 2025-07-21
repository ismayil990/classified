import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { categories } from '../data/options';
import axios from 'axios';
import AdvancedSearch from '../src/components/AdvancedSearch';
import { BiBody } from 'react-icons/bi';

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
 menuBar:false,
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
    },
    openMenu:(state)=>{
      state.menuBar=true;
      document.body.style.overflow="hidden"
    },
      closeMenu:(state)=>{
      state.menuBar=false
    },
   
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

export const { openCategorySheet,closeCategorySheet,toggleCategorySheet,changeCategory,openMenu,closeMenu} = categorySlice.actions;

export default categorySlice.reducer;
