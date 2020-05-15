import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div
      className={[
        styles.filters__container,
        filtersBarActive === true ? styles.active : ''
      ].join(' ')}
    >
      <h3 className={styles.title}>
        <span className="text__value">Filters</span>
      </h3>
      <TypeFilters
        active={selectedCardType}
        data={availableCardTypes}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => dispatch(selectType(selectedOption))}
      />
      <RaceFilters
        active={selectedCardRace}
        data={availableCardRaces}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => dispatch(selectRace(selectedOption))}
      />
      <MechanicsFilters
        active={selectedCardMechanics}
        data={availableCardMechanics}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onClick={selectedOption => dispatch(selectMechanic(selectedOption))}
      />
      <SetFilters
        active={selectedCardSet}
        data={availableCardSets}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => dispatch(selectSet(selectedOption))}
      />
      <RarityFilters
        active={selectedCardRarity}
        data={availableCardRarities}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onChange={selectedOption => dispatch(selectRarity(selectedOption))}
      />
      <EnergyFilters
        active={selectedEnergyFilter}
        isDesktopOrLaptop={isDesktopOrLaptop}
        onClick={event => dispatch(selectEnergy(event.target.value))}
        onChange={selectedOption => dispatch(selectEnergy(selectedOption))}
      />
    </div>
  );
}
