import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { pizzasAPI } from '../../api/api';


export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
    const {currentPage, sortType, categoryId, searchValue} = params;
    const pizzas = await pizzasAPI.getPizzas(currentPage, sortType, categoryId, searchValue);
    return pizzas;
})

export type Pizza = {
    id: string;
    name: string;
    imageUrl: string;
    sizes: number[];
    types: number[];
    price: number;
    rating: number;
    category: number;
}

export interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading' // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems (state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state: PizzaSliceState) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPizzas.fulfilled]: (state: PizzaSliceState, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state: PizzaSliceState) => {
            state.items = [];
            state.status = 'error';
        },
    }
})

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;