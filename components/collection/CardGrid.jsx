import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/collection/Card';
import { useRouter } from 'next/router';

export default function CardGrid({
  addSelectedCardCallback,
  database,
  handleClass,
  handleTooltipClick
}) {
  const router = useRouter();
  const { query } = router;

  return (
    <div className="card__grid" deckid={query}>
      {database.map((card, index) => {
        return (
          <div className={handleClass(card)} key={index}>
            <div
              className="tooltip"
              onClick={() => handleTooltipClick(card)}
              onKeyPress={() => handleTooltipClick(card)}
              role="button"
              tabIndex={-1}
            >
              <img alt="" src="/images/ui/UI_Tooltip.png" role="presentation" />
            </div>
            <Card
              artist={card.artist}
              attack={card.attack}
              cardClass={card.cardClass}
              collectible={card.collectible}
              cost={card.cost}
              elite={card.elite}
              entourage={card.entourage}
              flavor={card.flavor}
              goldenImageSrc={card.goldenImageSrc}
              health={card.health}
              hideStats={card.hideStats}
              howToEarn={card.howToEarn}
              howToEarnGolden={card.howToEarnGolden}
              id={card.id}
              isGolden={card.isGolden}
              mechanics={card.mechanics}
              name={card.name}
              playRequirements={card.playRequirements}
              race={card.race}
              rarity={card.rarity}
              set={card.set}
              sounds={card.sounds}
              spellDamage={card.spellDamage}
              spellType={card.spellType}
              targetingArrowText={card.targetingArrowText}
              text={card.text}
              type={card.type}
              warcryNumber={card.warcryNumber}
              onClick={() => addSelectedCardCallback(card)}
            />
          </div>
        );
      })}
    </div>
  );
}

CardGrid.propTypes = {
  addSelectedCardCallback: PropTypes.func,
  database: PropTypes.array,
  handleClass: PropTypes.func,
  handleTooltipClick: PropTypes.func
};

CardGrid.defaultProps = {
  addSelectedCardCallback: () => {},
  database: [],
  handleClass: () => {},
  handleTooltipClick: () => {}
};
