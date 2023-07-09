import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/store';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
          className={css.input}
          placeholder="Filter by name.."
        />
        <button type="button" onClick={() => dispatch(changeFilter(''))}>
          x
        </button>
      </div>
    </div>
  );
}
