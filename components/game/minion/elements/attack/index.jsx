import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Attack = ({ currentAttack, elite }) => {
  return (
    <div className={styles.component} data-value={currentAttack}>
      <div className={styles.text}>
        <div className={'text__value'}>{currentAttack}</div>
      </div>

      {elite ? (
        <img
          alt="ic_sword-alt"
          className={[styles.badge, styles.elite].join}
          src={`/images/card-assets/ic_sword-alt.png`}
        />
      ) : (
        <img
          alt="ic_sword"
          className={styles.badge}
          src={`/images/card-assets/ic_sword.png`}
        />
      )}
    </div>
  );
};

Attack.propTypes = {
  currentAttack: PropTypes.number,
  elite: PropTypes.bool
};

Attack.defaultProps = {
  currentAttack: 1,
  elite: false
};

export default Attack;
