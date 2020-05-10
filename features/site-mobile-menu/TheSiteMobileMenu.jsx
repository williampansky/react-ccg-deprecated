import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { toggleMobileMenu } from '@/features/site-mobile-menu/site-mobile-menu.slice';
import styles from './the-site-mobile-menu.module.scss';

export default function TheSiteMobileMenu() {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const siteMobileMenuActive = useSelector(s => s.siteMobileMenuActive);

  const data = [
    { path: '/info', name: 'Game Info' },
    { path: '/news', name: 'News' },
    { path: '/store', name: 'Store' },
    { path: '/heros', name: 'Heros' },
    { path: '/play', name: 'Play' },
    { path: '/account', name: 'Account' },
    { path: '/collection', name: 'Collection' }
  ];

  function handleClick(event, pathname) {
    event.preventDefault();
    dispatch(toggleMobileMenu());
    router.push(pathname);
  }

  function handleIcon(string) {
    // prettier-ignore
    switch (string) {
      case '/account':      return 'user';
      case '/collection':   return 'album';
      case '/heros':        return 'users';
      case '/info':         return 'question';
      case '/news':         return 'rss';
      case '/play':         return 'play-circle';
      case '/store':        return 'bookmark';
      default:              return;
    }
  }

  return (
    <div
      className={[
        styles.component,
        siteMobileMenuActive ? styles.active : ''
      ].join(' ')}
      style={{
        pointerEvents: siteMobileMenuActive ? 'auto' : 'none'
      }}
    >
      <nav className={styles.nav}>
        <ul className={styles.nav}>
          {data.map((obj, idx) => {
            const { name, path } = obj;
            return path === '/play' ? (
              <li className={pathname === path ? styles.active : ''} key={idx}>
                <div
                  className={
                    siteMobileMenuActive ? 'uk-animation-slide-left-small' : ''
                  }
                  style={{ animationDelay: `${idx}00ms` }}
                >
                  <a
                    className={[styles.item, styles.play__button].join(' ')}
                    href={path}
                    onClick={e => handleClick(e, path)}
                  >
                    <div>
                      <ReactSVG
                        className={styles.svg}
                        src={`/images/site/icon-uikit-${handleIcon(path)}.svg`}
                      />
                      <span className="text__value">{name}</span>
                    </div>
                  </a>
                </div>
              </li>
            ) : (
              <li className={pathname === path ? styles.active : ''} key={idx}>
                <div
                  className={
                    siteMobileMenuActive ? 'uk-animation-slide-left-small' : ''
                  }
                  style={{ animationDelay: `${idx}00ms` }}
                >
                  <a
                    className={styles.item}
                    href={path}
                    onClick={e => handleClick(e, path)}
                  >
                    <ReactSVG
                      className={styles.svg}
                      src={`/images/site/icon-uikit-${handleIcon(path)}.svg`}
                    />
                    <span>{name}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
