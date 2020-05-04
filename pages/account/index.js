import React from 'react';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';

export default function Account() {
  return (
    <React.Fragment>
      <Helmet
        title="Account | HSclone"
        meta={[{ property: 'og:title', content: 'Account' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">Account</main>
    </React.Fragment>
  );
}
