import React from 'react';

import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/PizzaLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({searchValue}) => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(null);
  const [sortType, setSortType] = React.useState({
    name: 'алфавиту (DESC)',
    sort: 'title',
    order: 'desc',
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const amountPages = 2;

  React.useEffect(() => {
    setIsLoaded(false);
    // Ссылка на отправка запроса для получение пицц
    let fetchURL = 'https://63027a3b9eb72a839d705b29.mockapi.io/items';

    fetchURL += `?page=${currentPage}&limit=5&sortBy=${sortType.sort}&order=${sortType.order}`

    if (categoryId !== null) {
      fetchURL += `&category=${categoryId+1}`;
    }

    if (searchValue !== '') {
      fetchURL += `&name=${searchValue}`;
    }

    fetch(fetchURL)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setItems(json);
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
            console.log(i);
            setCategoryId(i);
          }}
        />
        <Sort
          currentSort={sortType}
          setCurrentSort={(sortProperty) => {
            console.log(sortProperty);
            setSortType(sortProperty);
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
      <Pagination currentPage={currentPage} amountPages={amountPages} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Home;
