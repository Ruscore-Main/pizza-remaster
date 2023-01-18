import React from 'react';
export const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({activeIndex, setActiveIndex}) => {
  
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
