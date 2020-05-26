import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import {
  selectEnergy,
  selectMechanic,
  selectRace,
  selectSet,
  selectRarity,
  selectType
} from 'features/filters/filters.slice';
import { fetchResults } from 'features/filtered-results.slice';
import EnergyFilters from 'features/filters/EnergyFilters';
import MechanicsFilters from 'features/filters/MechanicsFilters';
import RaceFilters from 'features/filters/RaceFilters';
import SetFilters from 'features/filters/SetFilters';
import RarityFilters from 'features/filters/RarityFilters';
import styles from 'features/filters/filters-container.module.scss';
import TypeFilters from 'features/filters/TypeFilters';

export default function Filters() {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const {
    filtersBarActive,
    availableCardMechanics,
    availableCardRaces,
    availableCardRarities,
    availableCardSets,
    availableCardTypes,
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
    selectedCardType,
    selectedEnergyFilter,
    searchValue
  } = useSelector(state => state.filters);

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1200px)' });

  const setDbCallback = useCallback(
    (
      cardClass,
      cardMechanics,
      cardRace,
      cardRarity,
      cardSet,
      cardType,
      energyFilter,
      searchName
    ) => {
      dispatch(
        fetchResults({
          cardClass: cardClass,
          mechanics: cardMechanics,
          race: cardRace,
          rarity: cardRarity,
          set: cardSet,
          type: cardType,
          energyFilter: energyFilter,
          searchName: searchName
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setDbCallback(
      selectedCardClass,
      selectedCardMechanics,
      selectedCardRace,
      selectedCardRarity,
      selectedCardSet,
      selectedCardType,
      selectedEnergyFilter,
      searchValue
    );
  }, [
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
    selectedCardType,
    selectedEnergyFilter,
    searchValue,
    setDbCallback
  ]);

  const handleFilter = useCallback(
    (key, obj, path = '/collection') => {
      const useQuery = false;
      const label = obj && obj.label;
      const value = obj && obj.value;

      switch (key) {
        case 'type':
          if (useQuery)
            router.push(path, {
              query: { type: label },
              shallow: true
            });
          return dispatch(selectType(value));

        case 'race':
          if (useQuery)
            router.push(path, {
              query: { race: label },
              shallow: true
            });
          return dispatch(selectRace(value));

        case 'mechanics':
          if (useQuery)
            router.push(path, {
              query: { mechanics: label },
              shallow: true
            });
          return dispatch(selectMechanic(obj));

        case 'set':
          if (useQuery)
            router.push(path, {
              query: { set: label },
              shallow: true
            });
          return dispatch(selectSet(value));

        case 'rarity':
          if (useQuery)
            router.push(path, {
              query: { rarity: label },
              shallow: true
            });
          return dispatch(selectRarity(value));

        case 'energy':
          if (useQuery)
            router.push(path, {
              query: { energy: obj },
              shallow: true
            });
          return dispatch(selectEnergy(obj));

        default:
          break;
      }
    },
    [dispatch, router]
  );

  // const handleQueryMountingCallback = useCallback(
  //   obj => {
  //     if (!obj || obj === {}) return;
  //     const type = obj && obj.type;
  //     dispatch(selectType(type));
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   query !== {} && handleQueryMountingCallback(query);
  // }, [query, handleQueryMountingCallback]);

  return (
    <div
      className={[
        styles.filters__container,
        filtersBarActive === true ? styles.active : ''
      ].join(' ')}
    >
      {/* <h3 className={styles.title}>
        <span className="text__value">Filters</span>
      </h3> */}
      <TypeFilters
        active={selectedCardType}
        data={availableCardTypes}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => handleFilter('type', selectedOption)}
      />
      <RaceFilters
        active={selectedCardRace}
        data={availableCardRaces}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => handleFilter('race', selectedOption)}
      />
      <MechanicsFilters
        active={selectedCardMechanics}
        data={availableCardMechanics}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onClick={selectedOption => handleFilter('mechanics', selectedOption)}
      />
      <SetFilters
        active={selectedCardSet}
        data={availableCardSets}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => handleFilter('set', selectedOption)}
      />
      <RarityFilters
        active={selectedCardRarity}
        data={availableCardRarities}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => handleFilter('rarity', selectedOption)}
      />
      <EnergyFilters
        active={selectedEnergyFilter}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onClick={event => handleFilter('energy', event.target.value)}
        onChange={selectedOption => handleFilter('energy', selectedOption)}
      />
    </div>
  );
}
