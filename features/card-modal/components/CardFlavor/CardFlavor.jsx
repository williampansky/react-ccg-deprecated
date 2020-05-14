import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import createMarkup from '@/utils/createMarkup';
import formatCardText from '@/utils/format-card-text';

export default function CardFlavor({ spellDmg, text }) {
  return (
    <div className="text__value">
      <p
        className={styles.component}
        dangerouslySetInnerHTML={createMarkup(formatCardText(text, spellDmg))}
      />
    </div>
  );
}

CardFlavor.propTypes = {
  spellDmg: PropTypes.string,
  text: PropTypes.string
};
