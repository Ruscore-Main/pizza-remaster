import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
  },
});


store.subscribe(() => {
    console.log(store.getState())
})
