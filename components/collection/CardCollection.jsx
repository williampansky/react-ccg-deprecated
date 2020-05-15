import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setData as setCardModalData } from '@/features/card-modal/card-modal.slice';
import exists from '@/utils/element.exists';
import CardGrid from '@/components/collection/CardGrid';

export default function CardCollection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const siteSidebarActive = useSelector(s => s.siteSidebarActive);
  const database = useSelector(state => state.database);
  const { data, error, isLoading } = useSelector(
    state => state.filteredResults
  );

  // function handleClass(card, db = ownedCards) {
  //   const { id } = card;
  //   const owned = db.find(o => o.id === id);
  //   if (!exists(owned)) return 'locked';
  // }

  const handleTooltipClick = useCallback(
    (obj, path = '/collection') => {
      const { id } = obj;
      router.push(path, { query: { id: id }, shallow: true });
      return dispatch(setCardModalData(obj));
    },
    [dispatch, router]
  );

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
              data={data}
              error={error}
              // handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
              isLoading={isLoading}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
