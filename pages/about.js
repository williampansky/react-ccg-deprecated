import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function About() {
  return (
    <React.Fragment>
      <Helmet
        title="About | HSclone"
        meta={[{ property: 'og:title', content: 'About' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">About</main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
