import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import styles from './styles.module.scss';

export default function HeroImage({ symbol }) {
  return (
    <section className={styles.component}>
      <div className={styles.background__image__wrapper}>
        <div className={styles.background__image}>
          <Img src={`/images/heros/${symbol}/LAYOUT.jpg`} />
        </div>
      </div>

      <div className={styles.hero__image__inner}>
        <div className={styles.hero__image}>
          <Img src={`/images/heros/${symbol}/LAYOUT.jpg`} />
        </div>
      </div>
    </section>
  );
}

HeroImage.propTypes = {
  symbol: PropTypes.string
};
