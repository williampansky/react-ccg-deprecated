import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from 'lib/utils/card-databse';
import SET from 'enums/set.enums';

let initialState = [];

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState,
  reducers: {
    setResults(state, { payload }) {
      const { cardClass, mechanics, race, rarity, set, energyFilter } = payload;
      return Object.keys(CARD_DATABASE)
        .map(i => CARD_DATABASE[i])
        .filter(item => !item.isEntourage)
        .filter(item => item.set === SET[1] || item.set === SET[2])
        .filter(item => {
          if (energyFilter === -1) return item;
          else if (energyFilter === 10) return item.cost >= 10;
          else return item.cost === energyFilter;
        })
        .filter(item => {
          if (set === null) return item;
          else return item.set === set;
        })
        .filter(item => {
          if (race === null) return item;
          else return item.race === race;
        })
        .filter(item => {
          if (rarity === null) return item;
          else return item.rarity === rarity;
        })
        .filter(item => {
          function test(arr1, arr2) {
            const [shortArr, longArr] =
              arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];
            const longArrSet = new Set(longArr);
            return shortArr.some(el => longArrSet.has(el));
          }

          if (mechanics.length === 0) return item;
          else if (JSON.stringify(item.mechanics) === JSON.stringify(mechanics))
            return item;
          else if (test(item.mechanics, mechanics)) return item;
          // else if (item.mechanics.filter(m => m === mechanics)) return item;
          // else if (item.mechanics.find(m => m.includes(mechanics))) return item;
          else return null;
        })
        .filter(item => {
          return item.cardClass === cardClass;
        })
        .sort((a, b) => {
          if (a.cost > b.cost) return 1;
          if (a.cost < b.cost) return -1;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 1;
        });
    }
  }
});

export const { setResults } = filteredResultsSlice.actions;
export default filteredResultsSlice.reducer;
