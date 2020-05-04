import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/collection/Card';
import { useParams } from 'react-router-dom';

export default function CardGrid({
  addSelectedCardCallback,
  database,
  handleClass,
  handleTooltipClick
}) {
  let { deckId } = useParams();

  return (
    <Grid deckId={deckId}>
      {database.map((card, index) => {
        return (
          <div className={handleClass(card)} key={index}>
            <div className="tooltip" onClick={() => handleTooltipClick(card)}>
              <img
                alt=""
                src="assets/images/ui/UI_Tooltip.png"
                role="presentation"
              />
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
    </Grid>
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

const Grid = styled.article`
  display: grid;
  margin: 0 auto;
  padding: 20px 0 40px;
  grid-gap: 40px 30px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--card-height) / 1.4), 1fr)
  );

  & > div {
    position: relative;
    width: calc(var(--card-height) / 1.4);
    margin: 0 auto 0;
  }

  & > div .card__v3 {
    cursor: ${p => (p.deckId ? 'pointer' : 'default')};
    margin: 0 auto;
  }

  & > div .card__v3 {
    transition: opacity 200ms ease-in-out;
  }

  & > div .card__v3:before,
  & > div .card__v3:after {
    /* content: ''; */
    border-radius: 12px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    transition: opacity 150ms ease-in-out;
    will-change: opacity;
  }

  & > div .card__v3:before {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.625);
  }

  & > div .card__v3:after {
    box-shadow: 0 0 10px 10px rgba(255, 255, 0, 0.825);
  }

  & > div .card__v3:hover {
    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }

  & > div.locked .card__v3 {
    cursor: not-allowed;
    opacity: 0.45;

    &:hover:before,
    &:hover:after {
      opacity: 0;
    }
  }

  .tooltip {
    align-items: center;
    background: #ddd;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    font-size: 27px;
    height: 40px;
    justify-content: center;
    pointer-events: auto;
    position: absolute;
    right: 10%;
    /* right: 1%; */
    top: -4%;
    user-select: none;
    width: 40px;
    z-index: 2;
    transition: opacity, transform 200ms ease-in-out;
    will-change: opacity, transform;
    transform: scale(0);
    opacity: 0;

    @media (min-width: 960px) {
    }
  }

  .tooltip img {
    border-radius: 50%;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.625);
    height: 40px;
    width: 40px;
  }

  & > div:hover {
    z-index: 100;

    .tooltip {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
