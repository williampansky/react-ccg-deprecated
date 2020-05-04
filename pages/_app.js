import React from 'react';
import { Helmet } from 'react-helmet';
import '@/styles/root.site.css';
import '@/styles/root.css';
import 'components/board.css';
import 'components/lobby.css';
import '@/styles/app.scss';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title="Hello next.js!"
        meta={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
          },
          { property: 'og:title', content: 'Hello next.js!' }
        ]}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
