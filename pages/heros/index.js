import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
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
          <h1>
            <span>Choose your</span>
            <span className="text__value">Hero</span>
          </h1>
          <p>
            With more than 140 champions, you’ll find the perfect match for your
            playstyle. Master one, or master them all.
          </p>
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

              const path = ` /images/heros/${symbol.replace(/(%)/g, '')}`;

              return (
                <Link key={symbol} href="heros/[slug]" as={`/heros/${slug}`}>
                  <a
                    className="hero__item uk-animation-slide-bottom-small"
                    style={{ animationDelay: `${idx}00ms` }}
                  >
                    <span className="hero__image">
                      <VisibilitySensor>
                        <Img
                          alt={`${name} by ${artist}`}
                          decode={false}
                          src={[`${path}/default.jpg`, `${path}/default2x.jpg`]}
                          loader={<div className="hero__image__loader" />}
                          unloader={
                            <img alt="" src="/images/sets/PLACEHOLDER.jpg" />
                          }
                        />
                      </VisibilitySensor>
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
