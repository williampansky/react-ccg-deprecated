import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function HeroName({ name }) {
  return (
    <div className={styles.component}>
      <div className={styles.name__wrapper}>
        <h1 className={styles.name}>
          <span className="text__value">{name}</span>
        </h1>
      </div>
    </div>
  );
}

HeroName.propTypes = {
  name: PropTypes.string
};
