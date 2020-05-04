import React from 'react';
import styles from './hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.component}>
      <h1 className={styles.logo}>
        <span className="text-value">HSclone</span>
      </h1>
    </div>
  );
};

export default Hero;
