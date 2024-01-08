import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

const List = [
  { name: 'rating', sortProperty: 'rating'},
  { name: 'price  👆', sortProperty: 'price'},
  { name: 'price  👇', sortProperty: '-price'},
]

function Sort () {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = React.useRef();
  
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.composedPath && event.composedPath(); // Используем event.composedPath

      if (!path.includes(sortRef.current)){
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside );
    return () => {
      document.body.removeEventListener('click', handleClickOutside );
    }
  },[]);

  return (
    <div ref= {sortRef} className="sort">
      <div className="sort__label">
        <b>sort :</b>
        <span onClick={() => setOpen(!open)}>
          {sort.name}
        </span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {List.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.value === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
