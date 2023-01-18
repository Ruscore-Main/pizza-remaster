import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import fullPizzaSlice from './slices/fullPizzaSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
    fullPizza: fullPizzaSlice
  },
});


store.subscribe(() => {
    console.log(store.getState())
})
