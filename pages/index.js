import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Home({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Helmet
        title="Hello next.js!"
        meta={[{ property: 'og:title', content: 'About' }]}
      />
      <TheSiteHeader />
      <div>Home</div>
    </React.Fragment>
  );
}
