import React from 'react';

export type SortItem = {
  name: string,
  sort: 'rating' | 'price' | 'title',
  order: 'asc' | 'desc'
}

type SortProps = {
  currentSort: SortItem, 
  setCurrentSort: (sortProperty: SortItem) => void 
}

type PopupClick = MouseEvent & {
  path: Node[]
};

// Array<SortItem> or SortItem[]
export const sorts: Array<SortItem> = [
  { name: 'популярности (ASC)', sort: 'rating', order: 'asc' },
  { name: 'популярности (DESC)', sort: 'rating', order: 'desc' },
  { name: 'цене (ASC)', sort: 'price', order: 'asc' },
  { name: 'цене (DESC)', sort: 'price', order: 'desc' },
  { name: 'алфавиту (ASC)', sort: 'title', order: 'asc' },
  { name: 'алфавиту (DESC)', sort: 'title', order: 'desc' },
];

const Sort: React.FC<SortProps> = ({ currentSort, setCurrentSort }) => {
  
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const popup = React.useRef<HTMLDivElement>(null);

  const onClickListItem = (sort: SortItem) => {
    setCurrentSort(sort);
    setIsVisible(false);
  };

  React.useEffect(() => {
    
    const handleClick = (e: MouseEvent) => {
      // Добавляем новый параметр в тип, т.к. path не существует в MouseEvent
      const _e = e as PopupClick;
      const path = _e.path || (_e.composedPath && _e.composedPath());
      (popup.current && !path.includes(popup.current)) && setIsVisible(false);
    }

    document.body.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);

  }, []);

  return (
    <div className="sort" ref={popup}>
      <div className="sort__label">
        <svg
          className={isVisible ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{currentSort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sorts.map((obj, i) => (
              <li
                key={i}
                className={currentSort.name === obj.name ? 'active' : ''}
                onClick={() => onClickListItem(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
