import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'features/filters/filters-container.module.scss';

export default function RaceFilters({
  active,
  isDesktopOrLaptop,
  data,
  onChange
}) {
  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Race</div> */}
      <Select
        className={styles.select}
        id="RaceFilters"
        instanceId="RaceFilters"
        isClearable
        isSearchable={isDesktopOrLaptop ? true : false}
        menuPlacement={isDesktopOrLaptop ? 'top' : 'bottom'}
        onChange={selectedOption =>
          selectedOption === null ? onChange(null) : onChange(selectedOption)
        }
        options={data}
        placeholder="Race"
        width="100%"
      />
    </div>
  ) : null;
}

RaceFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  isDesktopOrLaptop: PropTypes.bool,
  onChange: PropTypes.func
};

RaceFilters.defaultTypes = {
  data: [],
  onChange: () => {}
};
