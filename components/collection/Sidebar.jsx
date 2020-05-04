import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import DeckCollection from 'components/collection/DeckCollection';
import DeckSidebar from 'components/collection/DeckSidebar';

export default function Sidebar({ active }) {
  return (
    <Component active={active}>
      <Switch>
        <Route path={`/decks/:deckId`} component={DeckSidebar} />
        <Route path={`/`} component={DeckCollection} />
      </Switch>
    </Component>
  );
}

Sidebar.propTypes = {
  active: PropTypes.bool,
  selectedCardClass: PropTypes.string
};

const Component = styled.aside`
  background: #1e1e1e;
  position: fixed;
  right: 0;
  top: 80px;
  width: 300px;
  height: 100%;
  z-index: 3;
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 150ms var(--animation-transition-cubic);

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
