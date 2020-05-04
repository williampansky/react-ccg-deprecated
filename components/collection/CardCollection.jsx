import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import Filters from 'features/filters/Filters.container';
import Sidebar from 'components/collection/Sidebar';
import SidebarActivator from 'components/collection/SidebarActivator';
import { selectClass } from 'features/filters/filters.slice';

export default function CardCollection() {
  const dispatch = useDispatch();
  const { sidebarActive } = useSelector(state => state.sidebar);
  const { selectedCardClass } = useSelector(state => state.filters);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [modalObject, setModalObject] = useState(null);

  // function handleClass(card, db = ownedCards) {
  //   const { id } = card;
  //   const owned = db.find(o => o.id === id);
  //   if (!exists(owned)) return 'locked';
  // }

  useEffect(() => {
    dispatch(selectClass(CARDCLASS[0]));
  }, [dispatch]);

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
        <GridWrapper className="_scrollable card-collection">
          {exists(database) ? (
            <CardGrid
              database={filteredResults}
              // handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
            />
          ) : null}
        </GridWrapper>

        <Footer>
          <Filters />
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

CardCollection.propTypes = {
  selectedCardClass: PropTypes.string
};

CardCollection.defaultProps = {
  selectedCardClass: CARDCLASS[0]
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
  overflow-y: scroll;
  width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
  transition: width 150ms var(--animation-transition-cubic);
  height: auto;
`;
