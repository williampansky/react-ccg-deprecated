import React from 'react';
import Link from 'next/link';
import NavbarNav from '@/features/site-header/components/NavbarNav';
import styles from './the-site-header.module.scss';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '@/features/site-mobile-menu/site-mobile-menu.slice';

export default function TheSiteHeader() {
  const dispatch = useDispatch();

  function handleToggle(event) {
    event.target.blur();
    dispatch(toggleMobileMenu());
  }

  return (
    <div className={styles.component}>
      <div className="container container--expand">
        <nav className={styles.navbar}>
          <section className={styles.navbar__left}>
            <Link href="/">
              <a className={styles.logo}>HSclone</a>
              {/* <a className={styles.logo}>
                <img alt="HSclone" src="/images/site/logo.png" />
              </a> */}
            </Link>
            <NavbarNav
              data={[
                { path: '/about', name: 'About' },
                { path: '/info', name: 'Game Info' },
                { path: '/news', name: 'News' },
                { path: '/store', name: 'Store' }
              ]}
            />
          </section>
          <section className={styles.navbar__right}>
            <NavbarNav
              data={[
                { path: '/account', name: 'Account' },
                { path: '/heros', name: 'Heros' },
                { path: '/collection', name: 'Collection' }
              ]}
            />
            <Link href="/play">
              <a className={styles.play__button}>
                <span className="text__value">Play</span>
              </a>
            </Link>
            <button
              className={styles.offcanvas__toggle}
              onClick={e => handleToggle(e)}
              onKeyPress={e => handleToggle(e)}
            >
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
            </button>
          </section>
        </nav>
      </div>
    </div>
  );
}
