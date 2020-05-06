import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import DeckItem from 'components/collection/DeckItem';

export default function Deck({ data, deckId, length, onClick }) {
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];
  const deckClass = deck && deck.class;

  function cardImage(cId, cSet) {
    if (!exists(cId)) return;
    const set = replaceConstant(cSet.replace(/(%)/g, ''));
    return `url(/images/sets/${set}/${cId}-DECK.jpg)`;
  }

  function classBadge(string) {
    if (!exists(string)) return false;
    const str = string.replace(/(%)/g, '');
    return `/images/classes/${str}/BADGE.png`;
  }

  return (
    <div className="deck__builder__deck">
      <div className="deck__stats">
        {classBadge(deckClass) !== false ? (
          <div className="item">
            <img alt="" className="class__badge" src={classBadge(deckClass)} />
          </div>
        ) : null}
        <div className="item">
          <div className="text__label">Deck</div>
          <div className="text__value">{length}/30</div>
        </div>
      </div>

      {data.map((card, index) => {
        const { _amount, cost, elite, id, name, rarity, set } = card;
        return (
          <div
            className="deck__item__wrapper"
            data-id={id}
            key={index}
            onClick={onClick}
          >
            <DeckItem
              amount={_amount}
              backgroundImage={cardImage(id, set)}
              cardId={id}
              cost={cost}
              elite={elite}
              name={name}
              rarity={rarity}
            />
          </div>
        );
      })}
    </div>
  );
}

Deck.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  length: PropTypes.number,
  onClick: PropTypes.func
};

Deck.defaultProps = {
  data: [],
  length: 0,
  onClick: () => {}
};
