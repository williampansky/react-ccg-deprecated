import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';

export default function CardCollection() {
  const siteSidebarActive = useSelector(s => s.siteSidebarActive);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [modalObject, setModalObject] = useState(null);

  // function handleClass(card, db = ownedCards) {
  //   const { id } = card;
  //   const owned = db.find(o => o.id === id);
  //   if (!exists(owned)) return 'locked';
  // }

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
        <div
          className={[
            'grid__wrapper',
            '_scrollable',
            'card-collection',
            siteSidebarActive ? 'collection__sidebar--active' : ''
          ].join(' ')}
        >
          {exists(database) ? (
            <CardGrid
              data={filteredResults}
              // handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
            />
          ) : null}
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

CardCollection.propTypes = {
  selectedCardClass: PropTypes.string
};

CardCollection.defaultProps = {
  selectedCardClass: CARDCLASS[0]
};
