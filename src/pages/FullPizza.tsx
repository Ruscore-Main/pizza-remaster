import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { categories } from '../components/Categories';
import { fetchFullPizza } from '../redux/slices/fullPizzaSlice';
import { RootState } from '../redux/store';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state: RootState) => state.fullPizza);

  React.useEffect(() => {
    dispatch(fetchFullPizza(id));
  }, []);
  return status === 'loading' ? (
    <div className="container">
      <h2>Идет загрузка...</h2>
    </div>
  ) : (
    <div className="container">
      <div className="container--pizza-info">
        <h2>{data.name}</h2>
        <div className="pizza-description">
          <img src={data.imageUrl} />
          <ul>
            <li>Цена: {data.price}₽</li>
            <li>Категория: {categories[data.category]}</li>
            <li>Рейтинг: {data.rating}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
