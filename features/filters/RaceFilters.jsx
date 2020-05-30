import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import removeSymbols from '@/utils/remove-symbols';
import styles from '@/features/filters/filters-container.module.scss';

export default function RaceFilters({
  active,
  isDesktopOrLaptop,
  data,
  onChange
}) {
  const Option = props => {
    // eslint-disable-next-line react/prop-types
    const { label, value } = props;
    return (
      <components.Option {...props}>
        <div className="icon__wrapper">
          <img
            alt={label}
            src={`/images/card-assets/SUBTYPE_${removeSymbols(value)}.png`}
          />
        </div>
        <div className="label__wrapper">{label}</div>
      </components.Option>
    );
  };

  return data.length !== 0 ? (
    <div className={styles.select__filter}>
      {/* <div className="label">Race</div> */}
      <Select
        className="filter-select-component"
        classNamePrefix="filter-select"
        components={{ Option }}
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
