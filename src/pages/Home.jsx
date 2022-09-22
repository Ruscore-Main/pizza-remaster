import React from 'react';

import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/PizzaLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(null);
  const [sortType, setSortType] = React.useState('rating');


  React.useEffect(() => {
    setIsLoaded(false);
    fetch('https://63027a3b9eb72a839d705b29.mockapi.io/items'+`?category=${categoryId+1}&sortBy=${sortType}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setItems(json);
        setIsLoaded(true);
      });

      window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} setActiveIndex={(i) => {console.log(i); setCategoryId(i)}}/>
        <Sort currentSort={sortType} setCurrentSort={(sortProperty) => {console.log(sortProperty); setSortType(sortProperty)}}/>
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
    </div>
  );
};

export default Home;
