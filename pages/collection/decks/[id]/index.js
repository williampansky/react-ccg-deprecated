import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import Sidebar from '@/components/collection/Sidebar';
import DeckBuilder from '@/components/collection/DeckBuilder';
import Filters from '@/features/filters/Filters.container';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import MobileFooter from '@/components/collection/MobileFooter';
import DesktopFooter from '@/components/collection/DesktopFooter';
import SearchModal from '@/features/filters/components/SearchModal/SearchModal';
import CardModalContainer from '@/features/card-modal/CardModal.container';

export default function Deck() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <React.Fragment>
      <Helmet
        title={`Deck ${id} | HSclone`}
        meta={[{ property: 'og:title', content: `Deck ${id}` }]}
      />
      <main className="site__wrapper">
        <DeckBuilder deckId={id} />
        <Sidebar deckId={id} />
        <Filters />
        <DesktopFooter />
        <MobileFooter />
      </main>
      <TheSiteHeader />
      <TheSiteMobileMenu />
      <SearchModal />
      <CardModalContainer />
    </React.Fragment>
  );
}
