import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEnergy,
  selectMechanic,
  selectRace,
  selectSet,
  selectRarity
} from 'features/filters/filters.slice';
import { setResults } from 'features/filtered-results.slice';
import EnergyFilters from 'features/filters/EnergyFilters';
import MechanicsFilters from 'features/filters/MechanicsFilters';
import RaceFilters from 'features/filters/RaceFilters';
import SetFilters from 'features/filters/SetFilters';
import RarityFilters from 'features/filters/RarityFilters';
import styles from 'features/filters/filters-container.module.scss';

export default function Filters() {
  const dispatch = useDispatch();
  const {
    filtersBarActive,
    availableCardMechanics,
    availableCardRaces,
    availableCardRarities,
    availableCardSets,
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
    selectedEnergyFilter,
    searchValue
  } = useSelector(state => state.filters);

  const setDbCallback = useCallback(
    (
      cardClass,
      cardMechanics,
      cardRace,
      cardRarity,
      cardSet,
      energyFilter,
      searchName
    ) => {
      dispatch(
        setResults({
          cardClass: cardClass,
          mechanics: cardMechanics,
          race: cardRace,
          rarity: cardRarity,
          set: cardSet,
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
      selectedEnergyFilter,
      searchValue
    );
  }, [
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
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
      <RaceFilters
        active={selectedCardRace}
        data={availableCardRaces}
        onChange={selectedOption => dispatch(selectRace(selectedOption))}
      />
      <MechanicsFilters
        active={selectedCardMechanics}
        data={availableCardMechanics}
        onClick={selectedOption => dispatch(selectMechanic(selectedOption))}
      />
      <SetFilters
        active={selectedCardSet}
        data={availableCardSets}
        onChange={selectedOption => dispatch(selectSet(selectedOption))}
      />
      <RarityFilters
        active={selectedCardRarity}
        data={availableCardRarities}
        onChange={selectedOption => dispatch(selectRarity(selectedOption))}
      />
      <EnergyFilters
        active={selectedEnergyFilter}
        onClick={event => dispatch(selectEnergy(event.target.value))}
        onChange={selectedOption => dispatch(selectEnergy(selectedOption))}
      />
    </div>
  );
}
