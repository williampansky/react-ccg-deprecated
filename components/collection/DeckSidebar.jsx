import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editDeckName, removeCard } from 'features/decks/decks.slice';
import Deck from 'components/collection/Deck';
import { setSidebar } from 'features/sidebar/sidebar.slice';

export default function DeckSidebar() {
  let { deckId } = useParams();
  const dispatch = useDispatch();
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];
  const selectedCards = deck && deck.cards;

  useEffect(() => {
    dispatch(setSidebar(true));
  }, [dispatch]);

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
    <Component>
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
        length={calculateDeckLength(selectedCards)}
        onClick={event => removeSelectedCardsCallback(event)}
      />
    </Component>
  );
}

const Component = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 10px 10px 60px;
  user-select: none;

  & > h2 {
    text-align: center;
  }

  input[type='text'] {
    width: 100%;
    text-align: center;
    font-size: 1em;
    top: 0;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    background: none;
    outline: 0;
    padding: 5px 20px 10px;

    &:focus {
      border-style: dashed;
    }
  }
`;
