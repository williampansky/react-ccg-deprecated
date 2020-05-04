import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './navbar-nav.module.scss';

const NavbarNav = ({ data }) => {
  return (
    <ul className={styles.nav}>
      {data.map((obj, idx) => {
        const { name, path } = obj;
        return (
          <li key={idx}>
            <Link href={path}>
              <a className={styles.item}>{name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

NavbarNav.propTypes = {
  data: PropTypes.array
};

NavbarNav.defaultTypes = {
  data: []
};

export default NavbarNav;
