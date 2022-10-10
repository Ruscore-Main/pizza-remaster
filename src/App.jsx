import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { decrement, increment } from './redux/slices/filterSlice'

import './scss/app.scss';

export const SearchContext = React.createContext('');

const App = (props) => {
  const [searchValue, setSearchValue] = React.useState('');
  const {value} = useSelector(state => state.filter)
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
    // <div className="wrapper">
    //   <SearchContext.Provider value={{searchValue, setSearchValue}}>
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route exact path="/" element={<Home />} />
    //         <Route exact path="/cart" element={<Cart />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </SearchContext.Provider>
    // </div>
  );
};

export default App;
