import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function ModalDialog({ children }) {
  return (
    <article className={styles.component}>
      <div className={styles.flex}>{children}</div>
    </article>
  );
}

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired
};
