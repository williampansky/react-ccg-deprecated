import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import styles from './styles.module.scss';
import replaceConstant from '@/utils/replace-constants';

export default function HeroSlideItem({ data }) {
  const { symbol } = data;

  function cardImage(string = symbol) {
    // if (!string) return;
    const path = replaceConstant(string.replace(/(%)/g, ''));
    return `/images/heros/${path}/LAYOUT.jpg`;
  }

  return (
    <div className={styles['component']}>
      <picture className={styles['image__wrapper']}>
        <Img
          alt={``}
          className={styles['image']}
          decode={false}
          src={cardImage(symbol)}
          loader={<div className={styles['loader']} />}
          unloader={
            <img
              alt=""
              className={styles['image__placeholder']}
              src="/images/sets/PLACEHOLDER.jpg"
            />
          }
        />
      </picture>
    </div>
  );
}

HeroSlideItem.propTypes = {
  data: PropTypes.shape({
    symbol: PropTypes.string
  })
};

HeroSlideItem.defaultTypes = {
  data: {
    symbol: ''
  }
};
