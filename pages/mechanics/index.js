import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Mechanics() {
  return (
    <React.Fragment>
      <Helmet
        title="Mechanics | HSclone"
        meta={[{ property: 'og:title', content: 'Mechanics' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Mechanics</main>
    </React.Fragment>
  );
}
