import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from '@/features/filters/filters-container.module.scss';

export default function RarityFilters({
  active,
  isDesktopOrLaptop,
  data,
  onChange
}) {
  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Race</div> */}
      <Select
        className="filter-select-component"
        classNamePrefix="filter-select"
        id="RarityFilters"
        instanceId="RarityFilters"
        isClearable
        isSearchable={isDesktopOrLaptop ? true : false}
        menuPlacement={isDesktopOrLaptop ? 'top' : 'bottom'}
        onChange={selectedOption =>
          selectedOption === null ? onChange(null) : onChange(selectedOption)
        }
        options={data}
        placeholder="Rarity"
        width="100%"
      />
    </div>
  ) : null;
}

RarityFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  isDesktopOrLaptop: PropTypes.bool,
  onChange: PropTypes.func
};

RarityFilters.defaultTypes = {
  data: [],
  onChange: () => {}
};
