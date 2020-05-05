import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Hero from '@/components/site/hero/Hero';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import ThreeColumnCards from '@/components/site/three-column-cards/ThreeColumnCards';

export default function Home({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Helmet
        title="Home | HSclone"
        meta={[{ property: 'og:title', content: 'Home' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper page__homepage">
        <Hero />
        {/* <ThreeColumnCards /> */}
      </main>
    </React.Fragment>
  );
}

Home.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};
