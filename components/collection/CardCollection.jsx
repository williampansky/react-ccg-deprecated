import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/collection/CardGrid';
import CardModal from 'components/collection/CardModal';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';

export default function CardCollection() {
  const router = useRouter();
  const { query } = router;
  const siteSidebarActive = useSelector(s => s.siteSidebarActive);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [modalObject, setModalObject] = useState(null);

  // function handleClass(card, db = ownedCards) {
  //   const { id } = card;
  //   const owned = db.find(o => o.id === id);
  //   if (!exists(owned)) return 'locked';
  // }

  const handleTooltipClick = useCallback(
    (obj, path = '/collection') => {
      if (obj === null) {
        router.push(path);
        return setModalObject(null);
      }

      const { id } = obj;
      router.push(path, { query: { id: id }, shallow: true });
      return setModalObject(obj);
    },
    [router]
  );

  function cardText(string, spellDmg) {
    const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
    const replacedSymbols = replaceConstant(replacedDynamicDmg);
    return replacedSymbols;
  }

  const handleQueryMountingCallback = useCallback(
    obj => {
      if (!obj || obj === {} || (obj && !obj.id)) return;
      const { id } = obj;
      const databaseObj = database.find(item => item.id === id);
      if (!databaseObj) return;
      return handleTooltipClick(databaseObj);
    },
    [database, handleTooltipClick]
  );

  useEffect(() => {
    query !== {} && handleQueryMountingCallback(query);
  }, [query, handleQueryMountingCallback]);

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
        handleTooltipClick={() => handleTooltipClick(null, '/collection')}
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
