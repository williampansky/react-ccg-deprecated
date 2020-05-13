import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addCard } from 'features/decks/decks.slice';
import { selectClass } from 'features/filters/filters.slice';
import { useSelector, useDispatch } from 'react-redux';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import ChooseClass from './ChooseClass';
// import DeleteDeckButton from './DeleteDeckButton';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import ClassFilters from '@/features/filters/ClassFilters';

export default function DeckBuilder({ deckId }) {
  const dispatch = useDispatch();

  const [modalObject, setModalObject] = useState(null);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const decks = useSelector(state => state.decks);
  const { availableCardClasses, selectedCardClass } = useSelector(
    state => state.filters
  );

  const deck = decks[deckId];
  const selectedCards = deck && deck.cards;
  const deckClass = deck && deck.class;

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

  useEffect(() => {
    dispatch(selectClass(deckClass));
  }, [dispatch, deckClass]);

  function calculateDeckLength(array) {
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

  function handleCount(card, db = selectedCards) {
    const { id } = card;
    const cardObj = db.find(o => o.id === id);
    if (!exists(cardObj)) return;
    const { _amount } = cardObj;
    return _amount;
  }

  function handleTooltipClick(obj) {
    return setModalObject(obj);
  }

  function cardText(string, spellDmg) {
    const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
    const replacedSymbols = replaceConstant(replacedDynamicDmg);
    return replacedSymbols;
  }

  return (
    <React.Fragment>
      <div className="card__collection__wrapper">
        <div className="card__collection__tabs">
          <ClassFilters
            active={selectedCardClass}
            data={availableCardClasses.filter(
              obj => obj.value === deckClass || obj.value === CARDCLASS[0]
            )}
            onClick={event => dispatch(selectClass(event.target.value))}
            onChange={selectedOption => dispatch(selectClass(selectedOption))}
          />
        </div>
        <div
          className={[
            'grid__wrapper',
            '_scrollable',
            'card-collection',
            !deckClass ? 'choose__class__wrapper' : ''
          ].join(' ')}
        >
          {deckClass ? (
            exists(database) ? (
              <CardGrid
                addSelectedCardCallback={addSelectedCardCallback}
                data={filteredResults}
                handleClass={handleClass}
                handleTooltipClick={handleTooltipClick}
                itemCount={handleCount}
              />
            ) : null
          ) : (
            <ChooseClass deckId={deckId} />
          )}
        </div>
      </div>

      <CardModal
        modalObject={modalObject}
        cardText={cardText}
        handleTooltipClick={() => handleTooltipClick(null)}
      />
    </React.Fragment>
  );
}

DeckBuilder.propTypes = {
  selectedCardClass: PropTypes.string
};

DeckBuilder.defaultProps = {
  // selectedCardClass: CARDCLASS[1]
};
