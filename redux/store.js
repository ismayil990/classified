import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice';
import postsReducer from "./postsSlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    posts: postsReducer,
    // başqa sliceları buraya əlavə edə bilərsən
  },
});

export default store;