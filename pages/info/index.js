import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function Info() {
  return (
    <React.Fragment>
      <Helmet
        title="Info | HSclone"
        meta={[{ property: 'og:title', content: 'Info' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Info</main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
