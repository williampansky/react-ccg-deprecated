import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import Link from 'next/link';

export default function Dev() {
  const links = [
    { name: 'Card', href: 'card' },
    { name: 'Minion', href: 'minion' }
  ];

  return (
    <React.Fragment>
      <Helmet
        title="Dev | HSclone"
        meta={[{ property: 'og:title', content: 'Dev' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">
        {links.map(link => {
          const { name, href } = link;
          return (
            <Link href={`/dev/${href}`} key={name}>
              {name}
            </Link>
          );
        })}
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
