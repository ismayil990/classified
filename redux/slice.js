import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openCategoryMenu:false,
  categoryName:"Bütün elanlar"
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
});

export const { openCategorySheet,closeCategorySheet,toggleCategorySheet,changeCategory} = categorySlice.actions;

export default categorySlice.reducer;
