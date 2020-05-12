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
        <div className="search__wrapper">
          <input
            onChange={event => setValue(event.target.value)}
            onKeyPress={event => setValue(event.target.value)}
            ref={ref}
            type="text"
            tabIndex={0}
          />
          {/* <button
            className="clear__button"
            onClick={event => clearValue(event)}
            tabIndex={0}
          >
            <ReactSVG src="/images/site/icon-uikit-close.svg" />
          </button> */}
        </div>
      </div>
      <div className="buttons__wrapper">
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
