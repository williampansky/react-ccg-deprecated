import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/features/filters/energy-filters.module.scss';

export default function EnergySlot({ active, number, value, onClick }) {
  return (
    <button className={styles.energy__slot} onClick={onClick} value={value}>
      <div className={styles['text__value--wrapper']}>
        <div className={'text__value'} data-value={number}>
          {number === 10 ? `10+` : number}
        </div>
      </div>

      {active === -1 ? (
        <img
          alt="Slot Available"
          src="/images/ui/UI_EnergySlot-Available.png"
        />
      ) : active === number ? (
        <img
          alt="Slot Available"
          src="/images/ui/UI_EnergySlot-Available.png"
        />
      ) : (
        <img alt="Slot Empty" src="/images/ui/UI_EnergySlot-Empty.png" />
      )}
    </button>
  );
}

EnergySlot.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
};
