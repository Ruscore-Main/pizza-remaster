import { createSlice } from '@reduxjs/toolkit';
import { sorts } from '../../components/Sort';

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
    },
    setFilters(state, action) {
      let {category=null, page=1, sortBy='title', order='desc'} = action.payload;
      state.categoryId = category != null ? +category : null ;
      state.currentPage = +page;
      state.sortType = sorts.find(el => el.sort === sortBy && el.order === order)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue, setSortType, setCategoryId, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
