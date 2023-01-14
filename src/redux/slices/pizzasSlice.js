import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pizzasAPI } from '../../api/api';


export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
    const {currentPage, sortType, categoryId, searchValue} = params;
    const pizzas = await pizzasAPI.getPizzas(currentPage, sortType, categoryId, searchValue);
    return pizzas;
})

const initialState = {
    items: [],
    status: 'loading' // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems (state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },
    }
})

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;