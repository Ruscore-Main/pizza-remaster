import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import obj from './assets/img/pizza.json';
import './scss/app.scss';

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {obj.pizzas.map((el) => (
              <PizzaBlock {...el} key={el.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
