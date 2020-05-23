import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const MechanicIcon = ({ hasCurse, hasPoison, hasOnslaught }) => {
  return (
    <div className={styles.component}>
      {hasCurse ? (
        <img alt="hasCurse" src="/images/mechanics/ON_DEATH.png" />
      ) : null}

      {hasPoison ? (
        <img alt="hasPoison" src="/images/mechanics/POISON.png" />
      ) : null}

      {hasOnslaught ? (
        <img alt="hasOnslaught" src="/images/mechanics/DOUBLE_ATTACK.png" />
      ) : null}
    </div>
  );
};

MechanicIcon.propTypes = {
  hasCurse: PropTypes.bool,
  hasPoison: PropTypes.bool,
  hasOnslaught: PropTypes.bool
};

MechanicIcon.defaultProps = {
  hasCurse: false,
  hasPoison: false,
  hasOnslaught: false
};

export default MechanicIcon;
