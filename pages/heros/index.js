import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Img from 'react-image';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

export default function Heros() {
  const heros = useSelector(s => s.heros);

  return (
    <React.Fragment>
      <Helmet
        title="Heros | HSclone"
        meta={[{ property: 'og:title', content: 'Heros' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper page__heros">
        <div className="hero">
          <h1 className="text__value">Heros</h1>
        </div>
        <div className="container">
          <div className="card__grid">
            {heros.map((obj, idx) => {
              const {
                name,
                symbol,
                archetype,
                ability1,
                ability2,
                ability3,
                lore,
                artist,
                slug
              } = obj;

              return (
                <Link key={symbol} href="heros/[slug]" as={`/heros/${slug}`}>
                  <a
                    className="hero__item uk-animation-slide-bottom-small"
                    style={{ animationDelay: `${idx}00ms` }}
                  >
                    <span className="hero__image">
                      <Img
                        alt={`${name} by ${artist}`}
                        src={`/images/heros/${symbol.replace(
                          /(%)/g,
                          ''
                        )}/DEFAULT.jpg`}
                        loader={<div className="hero__image__loader" />}
                      />
                    </span>
                    <span className="hero__name">
                      <span className="text__value">{name}</span>
                    </span>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
}
