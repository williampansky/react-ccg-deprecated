import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addCard } from 'features/decks/decks.slice';
import { selectClass } from 'features/filters/filters.slice';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import ChooseClass from './ChooseClass';
import DeleteDeckButton from './DeleteDeckButton';
import exists from 'utils/element.exists';
import Filters from 'features/filters/Filters.container';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import Sidebar from 'components/collection/Sidebar';

export default function DeckBuilder() {
  let { deckId } = useParams();
  const dispatch = useDispatch();

  const [modalObject, setModalObject] = useState(null);
  const { sidebarActive } = useSelector(state => state.sidebar);
  const { selectedCardClass } = useSelector(state => state.filters);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const decks = useSelector(state => state.decks);
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
      <Wrapper sidebarActive={sidebarActive}>
        <GridWrapper
          className="_scrollable card-collection"
          sidebarActive={sidebarActive}
        >
          {deckClass ? (
            exists(database) ? (
              <CardGrid
                addSelectedCardCallback={addSelectedCardCallback}
                database={filteredResults}
                handleClass={handleClass}
                handleTooltipClick={handleTooltipClick}
              />
            ) : null
          ) : (
            <ChooseClass />
          )}
        </GridWrapper>

        <Sidebar active={sidebarActive} selectedCardClass={selectedCardClass} />

        <Footer sidebarActive={sidebarActive}>
          <Filters />
          <DeleteDeckButton />
        </Footer>
      </Wrapper>

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
  selectedCardClass: CARDCLASS[5]
};

const Header = styled.header`
  background: #444;
  top: 0;
  user-select: none;
`;

const Footer = styled.footer`
  background: #444;
  bottom: 0;
  user-select: none;
  padding: 0 10px;
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    top: -30px;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(41, 41, 40, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  @media (min-width: 1920px) {
    &:before {
      height: 40px;
      top: -40px;
    }
  }
`;

const Wrapper = styled.main`
  user-select: none;
  width: 100%;
  height: 100%;

  ${Header},
  ${Footer} {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    height: 80px;
    width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
    transition: width 150ms var(--animation-transition-cubic);
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 80px;
  left: 0;
  padding: 20px;
  bottom: 80px;
  overflow-y: auto;
  width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
  transition: width 150ms var(--animation-transition-cubic);
  height: auto;
`;
