import React from 'react';
import Link from 'next/link';
import NavbarNav from '@/features/site-header/components/NavbarNav';
import styles from './the-site-header.module.scss';

export default function TheSiteHeader() {
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.navbar}>
          <div className={styles.navbar__left}>
            <Link href="/">
              <a className={styles.logo}>HSclone</a>
            </Link>
            <NavbarNav
              data={[
                { path: '/about', name: 'About' },
                { path: '/news', name: 'News' },
                { path: '/store', name: 'Store' }
              ]}
            />
          </div>
          <div className={styles.navbar__right}>
            <NavbarNav
              data={[
                { path: '/account', name: 'Account' },
                { path: '/collection', name: 'Collection' },
                { path: '/decks', name: 'Decks' }
              ]}
            />
            <Link href="/play">
              <a className={styles.play__button}>Play</a>
            </Link>
            <div className={styles.offcanvas__toggle}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                data-svg="navbar-toggle-icon"
              >
                <rect y="9" width="20" height="2"></rect>
                <rect y="3" width="20" height="2"></rect>
                <rect y="15" width="20" height="2"></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
