import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Home({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Helmet
        title="Home | HSclone"
        meta={[{ property: 'og:title', content: 'Home' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Home</main>
    </React.Fragment>
  );
}
