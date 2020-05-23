import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Health = ({ currentHealth, isDamaged, elite }) => {
  return (
    <div className={styles.component} data-value={currentHealth}>
      <div className={styles.text} data--is-damaged={isDamaged}>
        <div className={'text__value'}>{currentHealth}</div>
      </div>

      {elite ? (
        <img
          alt="ic_shield-alt"
          className={[styles.badge, styles.elite].join(' ')}
          src={`/images/card-assets/ic_shield-alt.png`}
        />
      ) : (
        <img
          alt="ic_shield"
          className={styles.badge}
          src={`/images/card-assets/ic_shield.png`}
        />
      )}
    </div>
  );
};

Health.propTypes = {
  currentHealth: PropTypes.number,
  isDamaged: PropTypes.bool,
  elite: PropTypes.bool
};

Health.defaultProps = {
  currentHealth: 1,
  isDamaged: false,
  elite: false
};

export default Health;
