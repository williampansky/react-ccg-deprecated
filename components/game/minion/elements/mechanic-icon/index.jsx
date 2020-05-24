import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const MechanicIcon = ({
  hasCurse,
  hasEventListener,
  hasOnslaught,
  hasPoison
}) => {
  function getDataLength() {
    let num = 0;
    if (hasCurse) num = num + 1;
    if (hasOnslaught) num = num + 1;
    if (hasPoison) num = num + 1;
    return num;
  }

  if (hasCurse) {
    return (
      <div className={styles.component}>
        <img alt="hasCurse" src="/images/mechanics/ON_DEATH.png" />
      </div>
    );
  } else if (hasEventListener) {
    return (
      <div className={styles.component}>
        <img alt="hasEventListener" src="/images/mechanics/EVENT.png" />
      </div>
    );
  } else if (hasPoison) {
    return (
      <div className={styles.component}>
        <img alt="hasPoison" src="/images/mechanics/POISON.png" />
      </div>
    );
  } else if (hasOnslaught) {
    return (
      <div className={styles.component}>
        <img alt="hasOnslaught" src="/images/mechanics/DOUBLE_ATTACK.png" />
      </div>
    );
  } else {
    return null;
  }

  // return (
  //   <div className={styles.component} data-length={getDataLength()}>
  //     {hasCurse ? (
  //       <img alt="hasCurse" src="/images/mechanics/ON_DEATH.png" />
  //     ) : null}

  //     {hasEventListener ? (
  //       <img alt="hasEventListener" src="/images/mechanics/EVENT.png" />
  //     ) : null}

  //     {hasPoison ? (
  //       <img alt="hasPoison" src="/images/mechanics/POISON.png" />
  //     ) : null}

  //     {hasOnslaught ? (
  //       <img alt="hasOnslaught" src="/images/mechanics/DOUBLE_ATTACK.png" />
  //     ) : null}
  //   </div>
  // );
};

MechanicIcon.propTypes = {
  hasCurse: PropTypes.bool,
  hasEventListener: PropTypes.bool,
  hasOnslaught: PropTypes.bool,
  hasPoison: PropTypes.bool
};

MechanicIcon.defaultProps = {
  hasCurse: false,
  hasEventListener: false,
  hasOnslaught: false,
  hasPoison: false
};

export default MechanicIcon;
