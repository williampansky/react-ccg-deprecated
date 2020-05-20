import { createSlice } from '@reduxjs/toolkit';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';
import RACE from 'enums/race.enums';
import MECHANICS from '@/enums/MECHANICS.json';
import SET from 'enums/set.enums';
import RARITY from 'enums/rarity.enums';
import exists from '@/utils/element.exists';
import TYPE from '@/enums/type.enums';

let initialState = {
  filtersBarActive: false,
  selectedCardClass: CARDCLASS[0],
  selectedCardMechanics: [],
  selectedCardRace: null,
  selectedCardRarity: null,
  selectedCardSet: null,
  selectedCardType: null,
  selectedEnergyFilter: 0,
  searchValue: null,
  searchModalActive: false,
  availableCardClasses: [
    { _order: 0, label: replaceConstant(CARDCLASS[0]), value: CARDCLASS[0] },
    { _order: 1, label: replaceConstant(CARDCLASS[1]), value: CARDCLASS[1] },
    { _order: 2, label: replaceConstant(CARDCLASS[2]), value: CARDCLASS[2] },
    { _order: 3, label: replaceConstant(CARDCLASS[3]), value: CARDCLASS[3] },
    { _order: 4, label: replaceConstant(CARDCLASS[4]), value: CARDCLASS[4] },
    { _order: 5, label: replaceConstant(CARDCLASS[5]), value: CARDCLASS[5] },
    { _order: 6, label: replaceConstant(CARDCLASS[6]), value: CARDCLASS[6] },
    { _order: 7, label: replaceConstant(CARDCLASS[7]), value: CARDCLASS[7] },
    { _order: 8, label: replaceConstant(CARDCLASS[8]), value: CARDCLASS[8] },
    { _order: 9, label: replaceConstant(CARDCLASS[9]), value: CARDCLASS[9] }
  ],
  availableCardMechanics: Object.keys(MECHANICS)
    .map(i => MECHANICS[i])
    .map(obj => {
      const { name, symbol } = obj;
      return {
        label: name,
        value: symbol
      };
    })
    .sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    }),
  availableCardRaces: [
    { _order: 1, label: replaceConstant(RACE[0]), value: RACE[0] },
    { _order: 2, label: replaceConstant(RACE[1]), value: RACE[1] },
    { _order: 3, label: replaceConstant(RACE[2]), value: RACE[2] },
    { _order: 4, label: replaceConstant(RACE[3]), value: RACE[3] },
    { _order: 5, label: replaceConstant(RACE[4]), value: RACE[4] },
    { _order: 6, label: replaceConstant(RACE[5]), value: RACE[5] },
    { _order: 7, label: replaceConstant(RACE[6]), value: RACE[6] },
    { _order: 8, label: replaceConstant(RACE[7]), value: RACE[7] },
    { _order: 9, label: replaceConstant(RACE[8]), value: RACE[8] },
    { _order: 10, label: replaceConstant(RACE[9]), value: RACE[9] }
  ],
  availableCardRarities: [
    { _order: 1, label: replaceConstant(RARITY[1]), value: RARITY[1] },
    { _order: 2, label: replaceConstant(RARITY[2]), value: RARITY[2] },
    { _order: 3, label: replaceConstant(RARITY[3]), value: RARITY[3] },
    { _order: 4, label: replaceConstant(RARITY[4]), value: RARITY[4] },
    { _order: 5, label: replaceConstant(RARITY[5]), value: RARITY[5] }
  ],
  availableCardSets: [
    { _order: 2, label: replaceConstant(SET[1]), value: SET[1] },
    { _order: 3, label: replaceConstant(SET[2]), value: SET[2] }
  ],
  availableCardTypes: [
    { _order: 1, label: replaceConstant(TYPE[1]), value: TYPE[1] },
    { _order: 2, label: replaceConstant(TYPE[2]), value: TYPE[2] },
    { _order: 3, label: replaceConstant(TYPE[3]), value: TYPE[3] },
    { _order: 4, label: replaceConstant(TYPE[4]), value: TYPE[4] }
  ]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    deselectMechanic(state, { payload }) {
      const arr = state.selectedCardMechanics.filter(o => o !== payload);
      state.selectedCardMechanics = arr;
    },
    selectClass(state, { payload }) {
      state.selectedCardClass = payload;
    },
    selectEnergy(state, { payload }) {
      const incomingValue = parseInt(payload);
      state.selectedEnergyFilter === incomingValue
        ? (state.selectedEnergyFilter = -1)
        : (state.selectedEnergyFilter = incomingValue);
    },
    selectMechanic(state, { payload }) {
      if (!payload) state.selectedCardMechanics = [];
      else state.selectedCardMechanics = payload.map(m => m.value);
    },
    selectRace(state, { payload }) {
      state.selectedCardRace = payload;
    },
    selectRarity(state, { payload }) {
      state.selectedCardRarity = payload;
    },
    selectSet(state, { payload }) {
      state.selectedCardSet = payload;
    },
    selectType(state, { payload }) {
      state.selectedCardType = payload;
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setFiltersBar(state, { payload }) {
      state.filtersBarActive = payload;
    },
    toggleFiltersBar(state) {
      state.filtersBarActive === true
        ? (state.filtersBarActive = false)
        : (state.filtersBarActive = true);
    },
    setSearchModal(state, { payload }) {
      if (exists(document)) {
        if (!document.body.classList.contains('noscroll') && payload === true)
          document.body.classList.add('noscroll');
        if (document.body.classList.contains('noscroll') && payload === false)
          document.body.classList.remove('noscroll');
      }

      state.searchModalActive = payload;
    },
    toggleSearchModal(state) {
      if (exists(document))
        state.searchModalActive === true
          ? document.body.classList.remove('noscroll')
          : document.body.classList.add('noscroll');

      state.searchModalActive === true
        ? (state.searchModalActive = false)
        : (state.searchModalActive = true);
    }
  }
});

export const {
  selectClass,
  selectEnergy,
  selectMechanic,
  selectRace,
  selectRarity,
  selectSet,
  selectType,
  setSearchValue,
  setFiltersBar,
  toggleFiltersBar,
  setSearchModal,
  toggleSearchModal
} = filtersSlice.actions;
export default filtersSlice.reducer;
