import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function News() {
  return (
    <React.Fragment>
      <Helmet
        title="News | HSclone"
        meta={[{ property: 'og:title', content: 'News' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">News</main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
