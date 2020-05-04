import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARD_DATABASE from 'lib/utils/card-databse';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import Deck from 'components/collection/Deck';
import exists from 'utils/element.exists';
import PlayerEnergy from 'features/filters/EnergyFilters';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';

export default function DeckBuilder({ selectedCardClass }) {
  const [database, setDatabase] = useState(null);
  const [cardClass, setCardClass] = useState(selectedCardClass);
  const [selectedCards, setSelectedCards] = useState([]);
  const [energyFilter, setEnergyFilter] = useState(-1);
  const [modalObject, setModalObject] = useState(null);

  const setDbCallback = useCallback((cardClass, energyFilter) => {
    const databaseArray = Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]);
    setDatabase(
      databaseArray
        .filter(item => {
          if (energyFilter === -1) {
            return item.cardClass === cardClass;
          } else if (energyFilter === 10) {
            return item.cardClass === cardClass && item.cost >= 10;
          } else {
            return item.cardClass === cardClass && item.cost === energyFilter;
          }
        })
        .sort((a, b) => a.cost - b.cost)
    );
  }, []);

  useEffect(() => {
    setDbCallback(cardClass, energyFilter);
    // setDatabase(CARD_DATABASE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardClass, energyFilter]);

  function sortArray(arr) {
    // eslint-disable-next-line array-callback-return
    return arr.sort((a, b) => {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });
  }

  const addSelectedCardCallback = useCallback(
    incomingCard => {
      if (calculateDeckLength(selectedCards) === 30) return;
      const { id } = incomingCard;
      if (selectedCards.find(o => o.id === id && o.elite === true)) {
        return;
      } else if (selectedCards.find(o => o.id === id && o._amount === 2)) {
        return;
      } else if (selectedCards.find(o => o.id === id)) {
        const cardObj = selectedCards.find(o => o.id === id);
        const newCardObj = { ...cardObj, _amount: 2 };
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray, newCardObj]));
      } else {
        setSelectedCards(previousData =>
          sortArray([...previousData, { ...incomingCard, _amount: 1 }])
        );
      }
    },
    [selectedCards]
  );

  const removeSelectedCardsCallback = useCallback(
    event => {
      const id = event.target.getAttribute('data-id');
      if (selectedCards.find(o => o.id === id && o._amount === 1)) {
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray]));
      } else {
        const cardObj = selectedCards.find(o => o.id === id);
        const newCardObj = { ...cardObj, _amount: 1 };
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray, newCardObj]));
      }
    },
    [selectedCards]
  );

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

  function changeCardClass(event) {
    return setCardClass(event.target.value);
  }

  function filterDatabaseByEnergy(event) {
    if (energyFilter === parseInt(event.target.value))
      return setEnergyFilter(-1);
    return setEnergyFilter(parseInt(event.target.value));
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
      <Wrapper>
        <Header>
          <button onClick={e => changeCardClass(e)} value={selectedCardClass}>
            {replaceConstant(selectedCardClass)}
          </button>
          <button onClick={e => changeCardClass(e)} value={CARDCLASS[0]}>
            {CARDCLASS[0]}
          </button>
        </Header>

        <Sidebar>
          <Deck
            data={selectedCards}
            length={calculateDeckLength(selectedCards)}
            onClick={event => removeSelectedCardsCallback(event)}
          />
          <img
            alt=""
            className="background"
            src="assets/images/ui/UI_Sidebar.png"
          />
        </Sidebar>

        <GridWrapper>
          {exists(database) ? (
            <CardGrid
              addSelectedCardCallback={addSelectedCardCallback}
              database={database}
              handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
            />
          ) : null}
        </GridWrapper>

        <Footer>
          <PlayerEnergy
            active={energyFilter}
            onClick={e => filterDatabaseByEnergy(e)}
          />
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
`;

const Footer = styled.footer`
  background: #444;
  bottom: 0;
`;

const Sidebar = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 3;

  .background {
    height: 100%;
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
  }
`;

const Wrapper = styled.main`
  ${Header},
  ${Footer} {
    position: fixed;
    width: calc(100vw - 272px);
    left: 0;
    right: 0;
    z-index: 2;
    height: 50px;
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 50px;
  padding: 20px;
  bottom: 50px;
  overflow-y: auto;
  width: calc(100vw - 272px);
`;
