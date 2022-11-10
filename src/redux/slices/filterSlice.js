import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: null,
  currentPage: 1,
  sortType: {
    name: 'алфавиту (DESC)',
    sort: 'title',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue, setSortType, setCategoryId, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
