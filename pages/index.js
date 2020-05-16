import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Hero from '@/components/site/hero/Hero';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import ThreeColumnCards from '@/components/site/three-column-cards/ThreeColumnCards';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

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
        <ThreeColumnCards />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          venenatis eros ex, ac commodo diam rutrum ut. Nulla placerat urna
          tellus, ac consectetur nisi semper ut. Praesent erat arcu, viverra sed
          accumsan ornare, rutrum ut nulla. Nullam et elementum magna. Etiam
          gravida, ligula vel sollicitudin rhoncus, sapien eros rutrum nunc, ut
          laoreet nibh turpis a diam. Sed vitae aliquet nisi, at faucibus purus.
          In condimentum lacus lacus, vitae consequat dolor aliquet quis. Cras
          est tellus, pharetra ut accumsan sed, sollicitudin pulvinar ante.
          Mauris erat purus, aliquet in nunc vitae, scelerisque eleifend odio.
        </p>
        <p>
          Suspendisse rutrum facilisis augue quis molestie. Donec congue
          consequat massa, eget vulputate augue rutrum nec. Maecenas cursus nisi
          neque, ac posuere lectus vehicula eget. Cras augue neque, volutpat
          pharetra mattis quis, tincidunt ac nunc. Aenean non dignissim nisl.
          Duis elementum ultricies erat vitae sollicitudin. Nullam tempus urna
          in dolor egestas aliquet. Proin ac mauris facilisis, blandit enim
          vitae, venenatis nibh. Nam congue porttitor tristique. In tincidunt
          velit sed mi cursus ullamcorper. Etiam quis sem ex. Duis dictum tortor
          purus, ut dignissim tellus lacinia ut.
        </p>
        <p>
          Suspendisse quam urna, cursus at mollis a, congue eu orci. Sed quis
          congue turpis, semper fringilla metus. Sed placerat interdum orci nec
          consectetur. Suspendisse eu ipsum eget lorem luctus placerat vel non
          dui. Vivamus euismod elit eros, ut elementum sapien mollis sit amet.
          Ut a est ac sapien dapibus egestas. Morbi dictum aliquam nibh.
        </p>
        <p>
          Aenean felis dui, tincidunt ut semper vel, gravida ac arcu. Ut rutrum
          ante vel suscipit tempor. Vestibulum tempus lorem quis ex ultricies
          porttitor eu sed felis. Vestibulum in rutrum velit, sit amet dapibus
          est. Vivamus ornare neque sed purus consequat, vitae egestas ligula
          dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed ac libero eros. Vestibulum mi nisi,
          auctor et dui eu, volutpat iaculis velit.
        </p>
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}

Home.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};
