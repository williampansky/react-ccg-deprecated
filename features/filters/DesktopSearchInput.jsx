import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { setSearchValue } from './filters.slice';

export default function DesktopSearchInput() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const ref = useRef();

  function handleSubmit(event, formValue = value) {
    event.preventDefault();
    return dispatch(setSearchValue(formValue ? formValue : null));
  }

  function clearValue(event) {
    const { current } = ref;
    event.target.blur();
    current.value = '';
    return setValue(null);
  }

  return (
    <form
      className="search__form"
      onSubmit={event => handleSubmit(event, value)}
    >
      <div>
        <input
          onChange={event => setValue(event.target.value)}
          ref={ref}
          type="text"
        />
      </div>
      <div>
        <div>
          <button className="submit">Search</button>
        </div>
        <div>
          <button className="clear" onClick={event => clearValue(event)}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}
