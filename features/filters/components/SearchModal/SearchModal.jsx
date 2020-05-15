import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import ReactSearchBox from 'react-search-box';
import {
  toggleSearchModal,
  setSearchValue,
  setSearchModal
} from '../../filters.slice';
import exists from '@/utils/element.exists';
import styles from './styles.module.scss';

export default function SearchModal() {
  const dispatch = useDispatch();
  const database = useSelector(s => s.database);
  const { searchModalActive } = useSelector(s => s.filters);
  const [value, setValue] = useState(null);
  const ref = useRef();

  function handleSubmit(event, formValue = value) {
    event.preventDefault();
    dispatch(toggleSearchModal());
    return dispatch(setSearchValue(formValue ? formValue : null));
  }

  function handleClick(event, formValue = value) {
    event.target.blur();
    dispatch(toggleSearchModal());
    return dispatch(setSearchValue(formValue ? formValue : null));
  }

  function clearValue(event, close = false) {
    event.target.blur();
    ref.current.state.value = '';
    setValue(null);

    if (close) {
      dispatch(setSearchModal(false));
      dispatch(setSearchValue(null));
    }
  }

  return (
    <div
      className={
        searchModalActive === true
          ? [styles.component, styles.open].join(' ')
          : styles.component
      }
      data-file="SearchModal"
    >
      <button
        className={styles.modal__close__button}
        onClick={() => dispatch(toggleSearchModal())}
      >
        <ReactSVG src="/images/site/icon-uikit-close.svg" />
      </button>
      <div className={styles.modal__dialog}>
        <form
          className={styles.search__form}
          onSubmit={event => handleSubmit(event, value)}
        >
          <div>
            <ReactSearchBox
              data={database}
              onChange={record => setValue(record)}
              onSelect={record => setValue(record)}
              ref={ref}
            />
          </div>
        </form>
        <div className={styles.flex}>
          <div>
            <button
              className={styles.submit__button}
              onClick={event => handleClick(event, value)}
            >
              <span className="text__value">Search</span>
            </button>
          </div>
          <div>
            <button
              className={styles.clear__button}
              onClick={event => {
                clearValue(event, false);
              }}
            >
              <span className="text__value">Clear</span>
            </button>
          </div>
          <div>
            <button
              className={styles.clear__button}
              onClick={event => {
                clearValue(event, true);
              }}
            >
              <span className="text__value">Clear &amp; Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
