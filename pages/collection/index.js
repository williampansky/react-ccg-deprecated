import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import CardCollection from '@/components/collection/CardCollection';
import Sidebar from '@/components/collection/Sidebar';
import Filters from '@/features/filters/Filters.container';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import MobileFooter from '@/components/collection/MobileFooter';

export default function Collection() {
  return (
    <React.Fragment>
      <Helmet
        title="Collection | HSclone"
        meta={[{ property: 'og:title', content: 'Collection' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">
        <Filters />
        <CardCollection />
        <Sidebar />
        <MobileFooter />
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
