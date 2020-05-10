import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Img from 'react-image';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import SearchModal from '@/features/filters/SearchModal';

export default function Hero() {
  const router = useRouter();
  const { slug } = router.query;
  const [hero, setHero] = useState(null);
  const heros = useSelector(s => s.heros);

  useEffect(() => {
    const found = heros.find(obj => obj.slug === slug);
    found ? setHero(found) : setHero(null);
  }, [heros, slug]);

  function parseAbility(string) {
    const cost = string
      .match(/cost\((.*?)\)/g)[0]
      .replace('cost(', '')
      .replace(')', '');
    const name = string
      .match(/name\((.*?)\)/g)[0]
      .replace('name(', '')
      .replace(')', '');
    const description = string
      .match(/description\((.*?)\)/g)[0]
      .replace('description(', '')
      .replace(')', '');

    return (
      <React.Fragment>
        <Img src={`/images/ui/UI_EnergySlot-Locked.png`} />
        <div>
          <h3>
            {name} ({cost})
          </h3>
          <p>{description}</p>
        </div>
      </React.Fragment>
    );
  }

  return hero !== null ? (
    <React.Fragment>
      <Helmet
        title={`Hero ${hero.name} | HSclone`}
        meta={[{ property: 'og:title', content: `Hero ${hero.name}` }]}
      />
      <TheSiteHeader />

      <main className="site__wrapper page__hero">
        <section className="section__wrapper">
          <div className="background__image__wrapper">
            <div className="background__image">
              <Img
                src={`/images/heros/${hero.symbol.replace(
                  /(%)/g,
                  ''
                )}/LAYOUT.jpg`}
              />
            </div>
          </div>
          <div className="hero__image__inner">
            <div className="hero__image">
              <Img
                src={`/images/heros/${hero.symbol.replace(
                  /(%)/g,
                  ''
                )}/LAYOUT.jpg`}
              />
            </div>
          </div>
          <div className="hero__intro__wrapper">
            <div className="hero__name__wrapper">
              <h1 className="hero__name">
                <span className="text__value">{hero.name}</span>
              </h1>
            </div>
            <div className="hero__lore__wrapper">
              <p className="hero__lore">{hero.lore}</p>
            </div>
          </div>
        </section>

        <section className="section__wrapper">
          <div className="hero__abilities__wrapper">
            <div className="hero__ability hero__ability--one">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${hero.symbol.replace(
                  /(%)/g,
                  ''
                )}/ABILITY_01.jpg`}
              />
              {parseAbility(hero.ability1)}
            </div>
            <div className="hero__ability hero__ability--two">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${hero.symbol.replace(
                  /(%)/g,
                  ''
                )}/ABILITY_02.jpg`}
              />
              {parseAbility(hero.ability2)}
            </div>
            <div className="hero__ability hero__ability--three">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${hero.symbol.replace(
                  /(%)/g,
                  ''
                )}/ABILITY_03.jpg`}
              />
              {parseAbility(hero.ability3)}
            </div>
          </div>
        </section>
      </main>

      <TheSiteMobileMenu />
      <SearchModal />
    </React.Fragment>
  ) : null;
}
