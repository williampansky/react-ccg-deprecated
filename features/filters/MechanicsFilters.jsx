import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from 'features/filters/filters-container.module.scss';

export default function MechanicsFilters({ active, data, onClick }) {
  const animatedComponents = makeAnimated();

  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Mechanics</div> */}
      <Select
        className={styles.select}
        classNamePrefix="mechanics"
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        menuPlacement="top"
        onChange={selectedOption => onClick(selectedOption)}
        options={data}
        placeholder="Mechanics"
        width="100%"
      />
    </div>
  ) : null;
}

MechanicsFilters.propTypes = {
  active: PropTypes.array,
  data: PropTypes.array,
  onClick: PropTypes.func
};

MechanicsFilters.defaultTypes = {
  data: [],
  onClick: () => {}
};
