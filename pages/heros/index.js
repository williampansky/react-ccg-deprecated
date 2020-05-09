import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function Heros() {
  const constants = useSelector(s => s.constants);

  return (
    <React.Fragment>
      <Helmet
        title="Heros | HSclone"
        meta={[{ property: 'og:title', content: 'Heros' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper page__mechanics">
        <div className="hero">
          <h1 className="text__value">Heros</h1>
        </div>
        <div className="container">
          <div className="content__container">
            <dl>
              {constants.map(obj => {
                const { description, name, symbol, type } = obj;
                return type === 'HERO' ? (
                  <section id={symbol} key={symbol}>
                    <dt>
                      <h3 className="text__value">{name}</h3>
                      {/* <span>{type}</span> */}
                    </dt>
                    <dd>{description ? description : 'Coming soon...'}</dd>
                  </section>
                ) : null;
              })}
            </dl>
          </div>
        </div>
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
