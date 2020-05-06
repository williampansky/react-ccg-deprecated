import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function Store() {
  return (
    <React.Fragment>
      <Helmet
        title="Store | HSclone"
        meta={[{ property: 'og:title', content: 'Store' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Store</main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
