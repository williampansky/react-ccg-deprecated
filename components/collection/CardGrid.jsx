import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Card from 'components/collection/Card';
import CardPlaceholder from './CardPlaceholder/CardPlaceholder';

export default function CardGrid({
  addSelectedCardCallback,
  data,
  error,
  handleClass,
  handleTooltipClick,
  isLoading,
  itemCount
}) {
  const router = useRouter();
  const {
    query: { id }
  } = router;

  return (
    <div className="card__grid uk-animation-fade" data-deckid={id}>
      {data.map((card, index) => {
        return (
          <div
            className={['card__item__wrapper', handleClass(card)].join(' ')}
            key={card.id}
            // style={{ transitionDelay: `${index}0ms` }}
          >
            <div
              className="tooltip"
              onClick={() => handleTooltipClick(card)}
              onKeyPress={() => handleTooltipClick(card)}
              role="button"
              tabIndex={-1}
            >
              <img
                alt={`${card.name} Card Information`}
                role="presentation"
                src="/images/ui/UI_Tooltip.png"
              />
            </div>
            <div className="card__wrapper" data-is-loading={isLoading}>
              <Card
                active={card.active}
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
                spellContext={card.spellContext}
                spellDamage={card.spellDamage}
                spellType={card.spellType}
                targetingArrowText={card.targetingArrowText}
                text={card.text}
                type={card.type}
                warcryNumber={card.warcryNumber}
                onClick={() => addSelectedCardCallback(card)}
              />
            </div>
            {itemCount(card) && (
              <div className="card__item__count">
                <div className="card__item__count__border">
                  <span className="text__value" data-value={itemCount(card)}>
                    {itemCount(card)}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

CardGrid.propTypes = {
  addSelectedCardCallback: PropTypes.func,
  data: PropTypes.array,
  error: PropTypes.object,
  handleClass: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  isLoading: PropTypes.bool,
  itemCount: PropTypes.func
};

CardGrid.defaultProps = {
  addSelectedCardCallback: () => {},
  data: [],
  error: null,
  handleClass: () => {},
  handleTooltipClick: () => {},
  isLoading: true,
  itemCount: () => {}
};
