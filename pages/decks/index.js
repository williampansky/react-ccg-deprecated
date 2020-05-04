import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Decks() {
  return (
    <React.Fragment>
      <Helmet
        title="Decks | HSclone"
        meta={[{ property: 'og:title', content: 'Decks' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Decks</main>
    </React.Fragment>
  );
}
