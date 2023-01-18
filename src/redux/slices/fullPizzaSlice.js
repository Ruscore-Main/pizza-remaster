import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { pizzasAPI } from '../../api/api';

const initialState = {
    data: {},
    status: 'loading' // loading | success | error
}

export const fetchFullPizza = createAsyncThunk('fullPizza/fetchFullPizza', async (id) => {
    const data = await pizzasAPI.getFullPizza(id);
    return data;
}) 

const fulllPizzaSlice = createSlice({
    initialState,
    name: 'fullPizza',
    extraReducers: {
        [fetchFullPizza.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchFullPizza.fulfilled]: (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        },
        [fetchFullPizza.rejected]: (state) => {
            state.status = 'error';
        },
    }
    
})


export default fulllPizzaSlice.reducer;