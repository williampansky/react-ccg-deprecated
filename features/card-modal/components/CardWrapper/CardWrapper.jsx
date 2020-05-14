import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Card from '@/components/collection/Card';
import TransformedCard from '../TransformedCard/TransformedCard';

export default function CardWrapper({ data }) {
  const ukAnimation = 'uk-animation-slide-bottom-small';
  return (
    <div className={[styles.component, ukAnimation].join(' ')}>
      <Card
        artist={data.artist}
        attack={data.attack}
        cardClass={data.cardClass}
        collectible={data.collectible}
        cost={data.cost}
        elite={data.elite}
        entourage={data.entourage}
        flavor={data.flavor}
        goldenImageSrc={data.goldenImageSrc}
        health={data.health}
        hideStats={data.hideStats}
        howToEarn={data.howToEarn}
        howToEarnGolden={data.howToEarnGolden}
        id={data.id}
        isGolden={data.isGolden}
        mechanics={data.mechanics}
        name={data.name}
        playRequirements={data.playRequirements}
        race={data.race}
        rarity={data.rarity}
        set={data.set}
        sounds={data.sounds}
        spellContext={data.spellContext}
        spellDamage={data.spellDamage}
        spellType={data.spellType}
        targetingArrowText={data.targetingArrowText}
        text={data.text}
        type={data.type}
        warcryNumber={data.warcryNumber}
      />

      {!data.elite ? <TransformedCard data={data} /> : null}
    </div>
  );
}

CardWrapper.propTypes = {
  data: PropTypes.object
};
