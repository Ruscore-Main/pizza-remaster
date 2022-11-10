import React from 'react';

const Categories = ({activeIndex, setActiveIndex}) => {
  
  const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        <li className={activeIndex === null ? 'active' : ''} onClick={() => setActiveIndex(null)}>
          Все
        </li>
        {categories.map((el, i) => (
          <li
            className={activeIndex === i ? 'active' : ''}
            key={el + i}
            onClick={() => setActiveIndex(i)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
