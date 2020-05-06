import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
// import Filters from 'features/filters/Filters.container';
import { selectClass } from 'features/filters/filters.slice';
import ClassFilters from '@/features/filters/ClassFilters';

export default function CardCollection() {
  const dispatch = useDispatch();
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [modalObject, setModalObject] = useState(null);
  const { availableCardClasses, selectedCardClass } = useSelector(
    state => state.filters
  );

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
      <div className="card__collection__wrapper">
        <div className="card__collection__tabs">
          <ClassFilters
            active={selectedCardClass}
            data={availableCardClasses}
            onClick={event => dispatch(selectClass(event.target.value))}
            onChange={selectedOption => dispatch(selectClass(selectedOption))}
          />
        </div>
        <div className="grid__wrapper _scrollable card-collection">
          {exists(database) ? (
            <CardGrid
              data={filteredResults}
              // handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
            />
          ) : null}
        </div>

        {/* <Footer>
          <Filters />
        </Footer> */}
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
