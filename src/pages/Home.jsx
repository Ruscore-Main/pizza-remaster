import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/PizzaLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setSortType } from '../redux/slices/filterSlice';
import { pizzasAPI } from '../api/api';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { categoryId, sortType, searchValue, currentPage } = useSelector(({ filter }) => filter);
  const dispatch = useDispatch();
  
  const amountPages = 2;

  React.useEffect(() => {
    setIsLoaded(false);
    // Ссылка на отправка запроса для получение пицц
    pizzasAPI.getPizzas(currentPage, sortType, categoryId, searchValue).then((pizzas) => {
      setItems(pizzas);
      setIsLoaded(true);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={(i) => {
            dispatch(setCategoryId(i));
          }}
        />
        <Sort
          currentSort={sortType}
          setCurrentSort={(sortProperty) => {
            dispatch(setSortType(sortProperty));
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* Вывод списка всех товаров */}
        {isLoaded
          ? items.map((el) => <PizzaBlock {...el} key={el.id} />)
          : Array(10)
              .fill(null)
              .map((_, i) => <PizzaLoader key={i} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        amountPages={amountPages}
        setCurrentPage={(page)=>dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
