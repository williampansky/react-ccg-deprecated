import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import Sidebar from '@/components/collection/Sidebar';
import DeckBuilder from '@/components/collection/DeckBuilderV3';
import Filters from '@/features/filters/Filters.container';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import MobileFooter from '@/components/collection/MobileFooter';
import DesktopFooter from '@/components/collection/DesktopFooter';
import SearchModal from '@/features/filters/SearchModal';

export default function Deck() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <React.Fragment>
      <Helmet
        title={`Deck ${id} | HSclone`}
        meta={[{ property: 'og:title', content: 'Collection' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">
        <Filters />
        <DeckBuilder deckId={id} />
        <Sidebar deckId={id} />
        <DesktopFooter />
        <MobileFooter />
      </main>
      <TheSiteMobileMenu />
      <SearchModal />
    </React.Fragment>
  );
}
