import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Img from 'react-image';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';
import SearchModal from '@/features/filters/components/SearchModal/SearchModal';
import createMarkup from '@/utils/createMarkup';
import formatHeroAbility from '@/utils/format-hero-ability';
import replaceConstant from '@/utils/replace-constants';
import HeroImage from '@/components/site/hero/HeroImage/HeroImage';
import HeroName from '@/components/site/hero/HeroName/HeroName';
import HeroLore from '@/components/site/hero/HeroLore/HeroLore';
import HeroAbilities from '@/components/site/hero/HeroAbilities/HeroAbilities';

export default function Hero() {
  const router = useRouter();
  const { slug } = router.query;
  const heros = useSelector(s => s.heros);
  const [hero, setHero] = useState(null);
  const ability1 = hero && hero.ability1 ? hero.ability1 : '';
  const ability2 = hero && hero.ability2 ? hero.ability2 : '';
  const ability3 = hero && hero.ability3 ? hero.ability3 : '';
  const name = hero && hero.name ? replaceConstant(hero.name) : '';
  const lore = hero && hero.lore ? hero.lore : '';
  const symbol = hero && hero.symbol ? hero.symbol.replace(/(%)/g, '') : '';

  useEffect(() => {
    const found = heros.find(obj => obj.slug === slug);
    found ? setHero(found) : setHero(null);
  }, [heros, slug]);

  return hero !== null ? (
    <React.Fragment>
      <Helmet
        title={`Hero ${name} | HSclone`}
        meta={[{ property: 'og:title', content: `Hero ${name}` }]}
      />
      <TheSiteHeader />

      <main className="site__wrapper page__hero">
        <HeroImage symbol={symbol} />
        <HeroName name={name} />
        <HeroLore lore={lore} />
        <HeroAbilities
          abilities={[ability1, ability2, ability3]}
          symbol={symbol}
        />

        {/* <section className="section__wrapper">
          <div className="hero__abilities__wrapper">
            <div className="hero__ability hero__ability--one">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${symbol}/ABILITY_01.jpg`}
              />
              {parseAbility(ability1)}
            </div>
            <div className="hero__ability hero__ability--two">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${symbol}/ABILITY_02.jpg`}
              />
              {parseAbility(ability2)}
            </div>
            <div className="hero__ability hero__ability--three">
              <Img
                className="hero__ability__image"
                src={`/images/heros/${symbol}/ABILITY_03.jpg`}
              />
              {parseAbility(ability3)}
            </div>
          </div>
        </section> */}
      </main>

      <TheSiteMobileMenu />
      <SearchModal />
    </React.Fragment>
  ) : null;
}
