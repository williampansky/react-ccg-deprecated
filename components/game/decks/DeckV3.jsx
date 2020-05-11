import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardBack from 'components/game/cards/CardBack';
import DeckItem from 'components/game/decks/DeckItem';
import PLAYER_BOARDS from 'enums/playerBoards.enums';
import styled from 'styled-components';

export default function Deck({
  board,
  cardBackSrc,
  data,
  length,
  playedCards
}) {
  function cardImage(id, set) {
    return `url(/images/sets/${set}/${id}-DECK.jpg)`;
  }

  return (
    <Component data-file="decks/Deck">
      {data.map((item, index) => {
        const { _amount, cost, elite, id, name, rarity, set } = item;

        return (
          <div key={index}>
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
    </Component>
  );
}

Deck.propTypes = {
  board: PropTypes.string,
  cardBackSrc: PropTypes.string,
  data: PropTypes.array,
  length: PropTypes.number,
  playedCards: PropTypes.array
};

const Component = styled.div`
  padding: 40px 10px;
  height: 100%;
  overflow-y: auto;

  & > div + div {
    margin-top: 2px;
  }
`;
