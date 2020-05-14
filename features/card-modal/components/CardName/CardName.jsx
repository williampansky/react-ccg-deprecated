import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function CardName({ active, inactiveLabel, name }) {
  return (
    <div className="text__value">
      {!active && <span className="inactive__label">{inactiveLabel}</span>}
      <h1 className={styles.name}>{name}</h1>
    </div>
  );
}

CardName.propTypes = {
  active: PropTypes.bool,
  inactiveLabel: PropTypes.string,
  name: PropTypes.string
};

CardName.defaultProps = {
  inactiveLabel: 'Inactive Card'
};
