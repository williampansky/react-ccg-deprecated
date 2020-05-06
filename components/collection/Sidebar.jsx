import React from 'react';
import PropTypes from 'prop-types';
import DeckCollection from 'components/collection/DeckCollection';
import DeckSidebar from './DeckSidebar';
import { useSelector } from 'react-redux';

export default function Sidebar({ deckId }) {
  const active = useSelector(s => s.siteSidebarActive);

  return (
    <div
      className={[
        'collection__sidebar',
        active ? 'collection__sidebar--active' : ''
      ].join(' ')}
    >
      {deckId ? <DeckSidebar deckId={deckId} /> : <DeckCollection />}
    </div>
  );
}

Sidebar.propTypes = {
  active: PropTypes.bool,
  selectedCardClass: PropTypes.string
};
