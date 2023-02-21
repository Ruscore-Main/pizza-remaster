import React from 'react';
export const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  activeIndex: null | number,
  setActiveIndex: (index: number | null) => void 
}

const Categories: React.FC<CategoriesProps> = ({activeIndex, setActiveIndex}) => {
  
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
