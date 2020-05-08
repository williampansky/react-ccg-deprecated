import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import EnergySlot from '@/components/collection/EnergySlot';
import styles from '@/features/filters/energy-filters.module.scss';

export default function EnergyFilters({ active, onClick, onChange }) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1200px)' });

  return (
    <div className={styles.component}>
      {isBigScreen ? (
        <div className={styles.flex}>
          <EnergySlot
            active={active}
            number={`All`}
            onClick={e => onClick(e)}
            value={-1}
          />

          {Array.from(Array(11)).map((_, index) => {
            return (
              <EnergySlot
                active={active}
                key={index}
                number={index}
                onClick={e => onClick(e)}
                value={index}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.select__wrapper}>
          <Select
            className={styles.select}
            id="EnergyFilters"
            instanceId="EnergyFilters"
            isClearable
            isSearchable
            menuPlacement="top"
            onChange={selectedOption =>
              selectedOption === null
                ? onChange(-1)
                : onChange(selectedOption.value)
            }
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
              { label: 6, value: 6 },
              { label: 7, value: 7 },
              { label: 8, value: 8 },
              { label: 9, value: 9 },
              { label: `10+`, value: 10 }
            ]}
            placeholder="Cost"
            width="100%"
          />
        </div>
      )}
    </div>
  );
}

// prettier-ignore
EnergyFilters.propTypes = {
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func,
  onChange: PropTypes.func
};
