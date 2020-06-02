import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { setData as setCardModalData } from '@/features/card-modal/card-modal.slice';
import exists from '@/utils/element.exists';
import CardGrid from '@/components/collection/CardGridVirtualized';
import { addCard, newDeck } from 'features/decks/decks.slice';
// import DeleteDeckButton from './DeleteDeckButton';

export default function DeckBuilder({ deckId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const siteSidebarActive = useSelector(s => s.siteSidebarActive);
  const decks = useSelector(state => state.decks);
  const database = useSelector(state => state.database);
  const { data, error, isLoading } = useSelector(
    state => state.filteredResults
  );

  const deck = decks[deckId];
  const selectedCards = deck && deck.cards;

  const addSelectedCardCallback = useCallback(
    (incomingCard, deckID = deckId) => {
      dispatch(
        addCard({
          deckId: deckID,
          card: incomingCard
        })
      );
    },
    [dispatch, deckId]
  );

  function calculateDeckLength(array = []) {
    let amount = 0;
    array.forEach(obj => {
      amount = Math.abs(amount + obj._amount);
    });
    return amount;
  }

  function handleClass(card, db = selectedCards) {
    if (calculateDeckLength(db) === 30) return 'locked';
    const { id } = card;
    const cardObj = db.find(o => o.id === id);
    if (!exists(cardObj)) return;
    const { _amount, elite } = cardObj;
    return _amount === 2 || elite === true ? 'locked' : '';
  }

  function handleCount(card = { id: '' }, db = selectedCards || []) {
    if (!db.length) return;
    const { id } = card;
    const cardObj = db.find(o => o.id === id);
    if (!exists(cardObj)) return;
    const { _amount } = cardObj;
    return _amount;
  }

  const handleTooltipClick = useCallback(
    obj => {
      return dispatch(setCardModalData(obj));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <div className="card__collection__wrapper">
        <div
          className={[
            'grid__wrapper',
            // '_scrollable',
            'card-collection',
            siteSidebarActive ? 'collection__sidebar--active' : ''
          ].join(' ')}
        >
          {/* {isLoading && (
            <div className="grid__spinner">
              <ReactSVG
                className="uk-spinner"
                src="/images/site/icon-uikit-spinner.svg"
              />
            </div>
          )} */}
          {exists(database) ? (
            <CardGrid
              addSelectedCardCallback={addSelectedCardCallback}
              data={data}
              error={error}
              handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
              isLoading={isLoading}
              itemCount={handleCount}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

DeckBuilder.propTypes = {
  deckId: PropTypes.string
};
