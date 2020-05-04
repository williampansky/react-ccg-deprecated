import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Collection() {
  return (
    <React.Fragment>
      <Helmet
        title="Collection | HSclone"
        meta={[{ property: 'og:title', content: 'Collection' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Collection</main>
    </React.Fragment>
  );
}
