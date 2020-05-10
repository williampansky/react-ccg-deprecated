import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { toggleMobileMenu } from '@/features/site-mobile-menu/site-mobile-menu.slice';
import NavbarNav from '@/features/site-header/components/NavbarNav';
import styles from './the-site-header.module.scss';

export default function TheSiteHeader() {
  const dispatch = useDispatch();
  const siteMobileMenuActive = useSelector(s => s.siteMobileMenuActive);

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
              {siteMobileMenuActive ? (
                <ReactSVG src="/images/site/icon-uikit-close.svg" />
              ) : (
                <ReactSVG src="/images/site/icon-uikit-menu.svg" />
              )}
            </button>
          </section>
        </nav>
      </div>
    </div>
  );
}
