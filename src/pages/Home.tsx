import React from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router";

import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Categories from "../components/Categories";
import Sort, { SortItem } from "../components/Sort";
import Pagination from "../components/Pagination/index";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSortType,
}
from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const isSearch = React.useRef(false);

  const {items, status} = useSelector(({ pizzas }): RootState => pizzas);
  const { categoryId, sortType, searchValue, currentPage } = useSelector(
    ({ filter }): RootState => filter
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const amountPages = 2;

  React.useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = qs.parse(search.substring(1));
      dispatch(setFilters(params)); 
      // Если запрос сделан из строки запроса
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      // Ссылка на отправка запроса для получение пицц
      dispatch(
        fetchPizzas({
          currentPage,
          sortType,
          categoryId,
          searchValue,
        })
      );
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если был первый рендер и изменили параметры запроса
  React.useEffect(() => {
    if (status === 'success') {
      const queryString = qs.stringify(
        {
          sortBy: sortType.sort,
          order: sortType.order,
          category: categoryId,
          page: currentPage,
        },
        { addQueryPrefix: true }
      );

      navigate(queryString);
    }
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={(i: number | null) => {
            dispatch(setCategoryId(i));
          }}
        />
        <Sort
          currentSort={sortType}
          setCurrentSort={(sortProperty: SortItem) => dispatch(setSortType(sortProperty))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === "error" ?
        <div className="content__error-info">
          <h2>
          Произошла ошибка <span>😕</span>
        </h2>
        <p>
          К сожалению, нам не удалось получить список товаров. Пожалуйста, повторите попытку позже.
        </p>
        </div>
        :
        <div className="content__items">
        {/* Вывод списка всех товаров */}
        {status === 'success'
          ? items.map((el: any) => <PizzaBlock key={el.id} {...el} />)
          : Array(10)
              .fill(null)
              .map((_, i) => <PizzaLoader key={i} />)}
      </div>
      }
      <Pagination
        amountPages={amountPages}
        setCurrentPage={(page: number) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
