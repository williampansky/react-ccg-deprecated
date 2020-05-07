import React from 'react';
import Card from '@/components/collection/Card';
import { useSelector } from 'react-redux';

export default function CardDevelopment() {
  // const
  const database = useSelector(s => s.database);
  const cardSet = 'PRIME';
  const cardId = '002';
  const idString = `${cardSet}_${cardId}`;
  const DATA = database.find(obj => obj.id === idString);

  return DATA !== null ? (
    <div
      style={{
        width: '100vw',
        height: '80vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div>
        <Card
          dev={true}
          artist={DATA.artist}
          attack={DATA.attack}
          cardClass={DATA.cardClass}
          collectible={DATA.collectible}
          cost={DATA.cost}
          elite={DATA.elite}
          entourage={DATA.entourage}
          flavor={DATA.flavor}
          goldenImageSrc={DATA.goldenImageSrc}
          health={DATA.health}
          hideStats={DATA.hideStats}
          howToEarn={DATA.howToEarn}
          howToEarnGolden={DATA.howToEarnGolden}
          id={DATA.id}
          isGolden={DATA.isGolden}
          mechanics={DATA.mechanics}
          name={DATA.name}
          playRequirements={DATA.playRequirements}
          race={DATA.race}
          rarity={DATA.rarity}
          set={DATA.set}
          sounds={DATA.sounds}
          spellDamage={DATA.spellDamage}
          spellType={DATA.spellType}
          targetingArrowText={DATA.targetingArrowText}
          text={DATA.text}
          type={DATA.type}
          warcryNumber={DATA.warcryNumber}
        />
      </div>
    </div>
  ) : null;
}
