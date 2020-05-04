import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './navbar-nav.module.scss';

const NavbarNav = ({ data }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul className={styles.nav}>
      {data.map((obj, idx) => {
        const { name, path } = obj;
        return (
          <li className={pathname === path ? styles.active : ''} key={idx}>
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
