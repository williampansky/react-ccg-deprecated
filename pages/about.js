import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function About() {
  return (
    <div>
      <Helmet
        title="About | Hello next.js!"
        meta={[{ property: 'og:title', content: 'About' }]}
      />
      <TheSiteHeader />
      About the World
    </div>
  );
}
