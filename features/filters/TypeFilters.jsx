import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import styles from 'features/filters/filters-container.module.scss';
import removeSymbols from '@/utils/remove-symbols';

export default function TypeFilters({
  active,
  isDesktopOrLaptop,
  data,
  onChange
}) {
  const Option = props => {
    // eslint-disable-next-line react/prop-types
    const { label, value } = props;
    return (
      <div className={styles.icon__type}>
        <div className={styles.icon__wrapper}>
          <img
            alt={label}
            src={`/images/card-assets/${removeSymbols(value)}.png`}
          />
        </div>
        <components.Option {...props} />
      </div>
    );
  };

  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Type</div> */}
      <Select
        className={styles.select}
        components={{ Option }}
        id="TypeFilters"
        instanceId="TypeFilters"
        isClearable
        isSearchable={isDesktopOrLaptop ? true : false}
        label="Type"
        menuPlacement={isDesktopOrLaptop ? 'top' : 'bottom'}
        onChange={selectedOption =>
          selectedOption === null ? onChange(null) : onChange(selectedOption)
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
