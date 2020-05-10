import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'features/filters/filters-container.module.scss';

export default function TypeFilters({
  active,
  isDesktopOrLaptop,
  data,
  onChange
}) {
  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Type</div> */}
      <Select
        className={styles.select}
        id="TypeFilters"
        instanceId="TypeFilters"
        isClearable
        isSearchable={isDesktopOrLaptop ? true : false}
        label="Type"
        menuPlacement={isDesktopOrLaptop ? 'top' : 'bottom'}
        onChange={selectedOption =>
          selectedOption === null
            ? onChange(null)
            : onChange(selectedOption.value)
        }
        options={data}
        placeholder="Type"
        width="100%"
      />
    </div>
  ) : null;
}

TypeFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  isDesktopOrLaptop: PropTypes.bool,
  onChange: PropTypes.func
};

TypeFilters.defaultTypes = {
  data: [],
  onChange: () => {}
};
