import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editDeckName, removeCard } from 'features/decks/decks.slice';
import Deck from 'components/collection/Deck';

export default function DeckSidebar({ deckId }) {
  const dispatch = useDispatch();
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];
  const selectedCards = deck && deck.cards;

  const removeSelectedCardsCallback = useCallback(
    (event, deckID = deckId) => {
      dispatch(
        removeCard({
          deckId: deckID,
          cardId: event.target.getAttribute('data-id')
        })
      );
    },
    [dispatch, deckId]
  );

  function calculateDeckLength(array) {
    if (!array) return;
    let amount = 0;
    array.forEach(obj => {
      amount = Math.abs(amount + obj._amount);
    });
    return amount;
  }

  return (
    <div className="deck__sidebar">
      <input
        className="text__value"
        type="text"
        defaultValue={deck && deck.name ? deck.name : deckId}
        onChange={e =>
          dispatch(
            editDeckName({
              deckId,
              name: e.target.value
            })
          )
        }
      />

      <Deck
        data={selectedCards}
        deckId={deckId}
        length={calculateDeckLength(selectedCards)}
        onClick={event => removeSelectedCardsCallback(event)}
      />
    </div>
  );
}
