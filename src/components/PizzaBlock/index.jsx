import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageLoader from '../../assets/img/imageLoader.svg';

const PizzaBlock = ({ name, imageUrl, types, sizes, price }) => {
  const [count, setCount] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(sizes[0]);
  const [activeType, setActiveType] = React.useState(types[0]);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const allTypes = ['тонкое', 'традиционное'];
  const allSizes = [26, 30, 40];
  return (
    
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" onLoad={() => setImageLoaded(true)} src={imageLoaded ? imageUrl : imageLoader} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {allTypes.map((type, i) => (
              <li
                className={classNames({
                  active: i == activeType,
                  muted: !types.includes(i),
                })}
                key={`${type}_${i}`}
                onClick={() => setActiveType(i)}>
                {type}
              </li>
            ))}
          </ul>
          <ul>
            {allSizes.map((size, i) => (
              <li
                className={classNames({
                  active: size == activeSize,
                  muted: !sizes.includes(size),
                })}
                key={`${size}_${i}`}
                onClick={() => setActiveSize(size)}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={() => setCount(count + 1)}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{count}</i>
          </button>
        </div>
      </div>
    </div>
      
  );
};

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default PizzaBlock;
