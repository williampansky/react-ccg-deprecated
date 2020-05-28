import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import HerosGridVirtualized from '@/components/site/heros-grid/HerosGridVirtualized';

export default function Heros() {
  const heros = useSelector(s => s.heros);

  return (
    <React.Fragment>
      <Helmet
        title="Heros | HSclone"
        meta={[{ property: 'og:title', content: 'Heros' }]}
      />
      <main className="site__wrapper page__heros">
        <div className="hero">
          <h1>
            <span>Choose your</span>
            <span className="text__value">Hero</span>
          </h1>
          <p>Find the perfect match for your playstyle.</p>
        </div>
        <HerosGridVirtualized data={heros} />
      </main>
      <TheSiteHeader />
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
