import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import CartEmpty from './pages/CartEmpty';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

const App = (props) => {
  const count = useSelector(({cart})=>cart.count)
  console.log('count === ', count)
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={count ? <Cart /> : <CartEmpty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
