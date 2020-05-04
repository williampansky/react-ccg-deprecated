import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function About() {
  return (
    <React.Fragment>
      <Helmet
        title="About | HSclone"
        meta={[{ property: 'og:title', content: 'About' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">About</main>
    </React.Fragment>
  );
}
