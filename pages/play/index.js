import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function Play() {
  return (
    <React.Fragment>
      <Helmet
        title="Play | HSclone"
        meta={[{ property: 'og:title', content: 'Play' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Play</main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
