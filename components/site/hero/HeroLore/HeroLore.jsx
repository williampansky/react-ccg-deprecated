import React from 'react';
import PropTypes from 'prop-types';
import createMarkup from '@/utils/createMarkup';
import styles from './styles.module.scss';

export default function HeroLore({ lore }) {
  return (
    <div className={styles.component}>
      <div
        className={styles.lore}
        dangerouslySetInnerHTML={createMarkup(lore)}
      />
    </div>
  );
}

HeroLore.propTypes = {
  lore: PropTypes.string
};
