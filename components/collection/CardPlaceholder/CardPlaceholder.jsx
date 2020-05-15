import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function CardPlaceholder() {
  return (
    <div className={styles.component}>
      <div className={styles.content} />
      <div className={styles.card__cost} />
      <div className={styles.card__name} />
      <div className={styles.card__text}>
        {/* <div className={styles.line__1} />
        <div className={styles.line__2} />
        <div className={styles.card__text__1} />
        <div className={styles.card__text__2} />
        <div className={styles.line__3} />
        <div className={styles.line__4} /> */}
        <div className={[styles.line, styles.padding__top].join(' ')} />
        <div className={[styles.line, styles.padding__left].join(' ')} />
        <div className={[styles.line, styles.padding__right].join(' ')} />
        <div className={[styles.line, styles.padding__bottom].join(' ')} />
        <div className={[styles.line, styles.line__1].join(' ')} />
        <div className={[styles.line, styles.line__2].join(' ')} />
        <div className={[styles.line, styles.line__3].join(' ')} />
        <div className={[styles.line, styles.line__4].join(' ')} />
      </div>
    </div>
  );
}
