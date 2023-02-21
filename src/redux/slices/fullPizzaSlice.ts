import { Pizza } from './pizzasSlice';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { pizzasAPI } from '../../api/api';

export interface FullPizzaSliceState { 
    data: Pizza | null,
    status: string
}

const initialState: FullPizzaSliceState = {
    data: null,
    status: 'loading' // loading | success | error
}

export const fetchFullPizza = createAsyncThunk('fullPizza/fetchFullPizza', async (id) => {
    const data = await pizzasAPI.getFullPizza(id);
    return data;
}) 

const fulllPizzaSlice = createSlice({
    initialState,
    name: 'fullPizza',
    reducers: {},
    extraReducers: {
        [fetchFullPizza.pending]: (state: FullPizzaSliceState) => {
            state.status = 'loading';
        },
        [fetchFullPizza.fulfilled]: (state: FullPizzaSliceState, action) => {
            state.status = 'success';
            state.data = action.payload;
        },
        [fetchFullPizza.rejected]: (state: FullPizzaSliceState) => {
            state.status = 'error';
        },
    }
    
})


export default fulllPizzaSlice.reducer;