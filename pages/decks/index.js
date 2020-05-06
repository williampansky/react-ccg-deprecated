import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import CardCollection from '@/components/collection/CardCollection';
import Sidebar from '@/components/collection/Sidebar';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import MobileFooter from '@/components/collection/MobileFooter';

export default function Decks() {
  return (
    <React.Fragment>
      <Helmet
        title="Decks | HSclone"
        meta={[{ property: 'og:title', content: 'Decks' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">
        <CardCollection />
        <Sidebar />
        <MobileFooter />
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
