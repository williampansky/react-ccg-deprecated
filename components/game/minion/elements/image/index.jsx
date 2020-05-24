import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import styles from './styles.module.scss';
import replaceConstant from '@/utils/replace-constants';

const Image = ({ id, isGolden, name, set }) => {
  /**
   * Retrieves the pathname for the image asset.
   * @param {string} cardId
   * @param {string} cardSet
   * @param {bool} isGold
   */
  function getMinionImage(cardId, cardSet, isGold) {
    if (!cardSet) return;
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return isGold
      ? `/images/sets/${set}/${cardId}-MINION-GOLD.gif`
      : `/images/sets/${set}/${cardId}-MINION.jpg`;
  }

  return (
    <div className={styles.component} data-file="Minion/image">
      <div className="concealed__clouds" style={{ display: 'none' }} />
      <Img
        alt={name}
        className={styles.image}
        decode={false}
        src={getMinionImage(id, set, isGolden)}
        loader={<div className={styles.loader} />}
        unloader={<img alt="None" src="/images/sets/PLACEHOLDER.jpg" />}
      />
    </div>
  );
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isGolden: PropTypes.bool,
  name: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired
};

Image.defaultProps = {
  isGolden: false
};

export default Image;
