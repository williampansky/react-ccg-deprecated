import React from 'react';
import Link from 'next/link';
import NavbarNav from '@/features/site-header/components/NavbarNav';
import styles from './the-site-mobile-menu.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '@/features/site-mobile-menu/site-mobile-menu.slice';

export default function TheSiteMobileMenu() {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const siteMobileMenuActive = useSelector(s => s.siteMobileMenuActive);

  const data = [
    { path: '/about', name: 'About' },
    { path: '/mechanics', name: 'Mechanics' },
    { path: '/news', name: 'News' },
    { path: '/store', name: 'Store' },
    { path: '/account', name: 'Account' },
    { path: '/collection', name: 'Collection' }
  ];

  function handleClick(event, pathname) {
    event.preventDefault();
    dispatch(toggleMobileMenu());
    router.push(pathname);
  }

  return (
    <div
      className={[
        styles.component,
        siteMobileMenuActive ? styles.active : ''
      ].join(' ')}
    >
      <nav className={styles.nav}>
        <ul className={styles.nav}>
          {data.map((obj, idx) => {
            const { name, path } = obj;
            return (
              <li className={pathname === path ? styles.active : ''} key={idx}>
                <a
                  className={styles.item}
                  href={path}
                  onClick={e => handleClick(e, path)}
                >
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
