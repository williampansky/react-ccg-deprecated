import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './styles.module.scss';

export default function CloseButton() {
  return (
    <button className={styles.component}>
      <ReactSVG src="/images/site/icon-uikit-close.svg" />
    </button>
  );
}
