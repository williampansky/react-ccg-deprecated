import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectClass,
  selectEnergy,
  selectMechanic,
  selectRace,
  selectSet,
  selectRarity
} from 'features/filters/filters.slice';
import { setResults } from 'features/filtered-results.slice';
import ClassFilters from 'features/filters/ClassFilters';
import EnergyFilters from 'features/filters/EnergyFilters';
import MechanicsFilters from 'features/filters/MechanicsFilters';
import RaceFilters from 'features/filters/RaceFilters';
import SetFilters from 'features/filters/SetFilters';
import RarityFilters from './RarityFilters';

export default function Filters() {
  const dispatch = useDispatch();
  const {
    availableCardClasses,
    availableCardMechanics,
    availableCardRaces,
    availableCardRarities,
    availableCardSets,
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
    selectedEnergyFilter
  } = useSelector(state => state.filters);

  const setDbCallback = useCallback(
    (cardClass, cardMechanics, cardRace, cardRarity, cardSet, energyFilter) => {
      dispatch(
        setResults({
          cardClass: cardClass,
          mechanics: cardMechanics,
          race: cardRace,
          rarity: cardRarity,
          set: cardSet,
          energyFilter: energyFilter
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
      selectedEnergyFilter
    );
  }, [
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardRarity,
    selectedCardSet,
    selectedEnergyFilter,
    setDbCallback
  ]);

  return (
    <Component>
      <ClassFilters
        active={selectedCardClass}
        data={availableCardClasses}
        onClick={event => dispatch(selectClass(event.target.value))}
        onChange={selectedOption => dispatch(selectClass(selectedOption))}
      />
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
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
`;
