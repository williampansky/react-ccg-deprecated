import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from 'features/filters/filters-container.module.scss';

export default function SetFilters({ active, data, onChange }) {
  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Sets</div> */}
      <Select
        className={styles.select}
        isClearable
        isSearchable
        label="Set"
        menuPlacement="top"
        onChange={selectedOption =>
          selectedOption === null
            ? onChange(null)
            : onChange(selectedOption.value)
        }
        options={data}
        placeholder="Set"
        width="100%"
      />
    </div>
  ) : null;
}

SetFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func
};

SetFilters.defaultTypes = {
  data: [],
  onChange: () => {}
};
