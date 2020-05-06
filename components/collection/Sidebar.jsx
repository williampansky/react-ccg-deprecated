import React from 'react';
import PropTypes from 'prop-types';
import DeckCollection from 'components/collection/DeckCollection';
import DeckSidebar from './DeckSidebar';

export default function Sidebar({ deckId }) {
  return (
    <div className="collection__sidebar">
      {deckId ? <DeckSidebar deckId={deckId} /> : <DeckCollection />}
    </div>
  );
}

Sidebar.propTypes = {
  active: PropTypes.bool,
  selectedCardClass: PropTypes.string
};
