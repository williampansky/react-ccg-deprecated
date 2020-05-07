import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { toggleSearchModal, setSearchValue } from './filters.slice';

export default function SearchModal() {
  const dispatch = useDispatch();
  const { searchModalActive } = useSelector(s => s.filters);
  const [value, setValue] = useState(null);

  function handleSubmit(event, formValue = value) {
    event.preventDefault();
    dispatch(toggleSearchModal());
    return dispatch(setSearchValue(formValue ? formValue : null));
  }

  return (
    <div
      className={
        searchModalActive === true ? 'card__modal open' : 'card__modal'
      }
      role="button"
      tabIndex={0}
    >
      <button
        className="modal__close__button"
        onClick={() => dispatch(toggleSearchModal())}
      >
        <ReactSVG src="/images/site/logo-uikit-close.svg" />
      </button>
      <div className="modal__dialog">
        <form
          className="search__form"
          onSubmit={event => handleSubmit(event, value)}
        >
          <div>
            <input
              onChange={event => setValue(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <button>Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}
