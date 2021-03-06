import React from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/collection/Card';
import styles from './styles.module.scss';

export default function TransformedCard({ data }) {
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
        numberOvercharge={data.numberOvercharge}
        numberPrimary={data.numberPrimary}
        numberRNG={data.numberRNG}
        numberSecondary={data.numberSecondary}
        playContext={data.playContext}
        playRequirements={data.playRequirements}
        playType={data.playType}
        race={data.race}
        rarity={data.rarity}
        set={data.set}
        sounds={data.sounds}
        spellDamage={data.spellDamage}
        targetingArrowText={data.targetingArrowText}
        text={data.text}
        type={data.type}
      />
    </div>
  );
}

TransformedCard.propTypes = {
  data: PropTypes.object
};
