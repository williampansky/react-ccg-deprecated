import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from '@/lib/utils/card-databse';
import SET from '@/enums/set.enums';

let initialState = {
  data: [],
  error: null,
  isLoading: false
};

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState,
  reducers: {
    getResultsStart(state) {
      state.isLoading = true;
    },
    getResultsFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    getResultsSuccess(state, { payload }) {
      state.isLoading = false;
      state.error = null;
      const {
        type,
        mechanics,
        race,
        rarity,
        set,
        energyFilter,
        searchName
      } = payload;

      state.data = Object.keys(CARD_DATABASE)
        .map(i => CARD_DATABASE[i])
        .filter(item => !item.isEntourage)
        .filter(item => item.active)
        .filter(item => item.set === SET[1] || item.set === SET[2])
        .filter(item => {
          if (energyFilter === -1) return item;
          else if (energyFilter === 10) return item.cost >= 10;
          else return item.cost === energyFilter;
        })
        .filter(item => {
          if (searchName === null) return item;

          const searchTerm = searchName.toLowerCase();
          if (item.id.toLowerCase().includes(searchTerm))
            return item.id.toLowerCase().includes(searchTerm);
          else return item.name.toLowerCase().includes(searchTerm);
        })
        .filter(item => {
          if (type === null) return item;
          else return item.type === type;
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
          else return null;
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

export const {
  getResultsStart,
  getResultsFailure,
  getResultsSuccess
} = filteredResultsSlice.actions;

export default filteredResultsSlice.reducer;

const fetchResultsFromDatabase = async data => {
  // const dirName = neighborhood.replace(/( )/g, '-');
  // const fileName = address.replace(/( )/g, '-');
  // const response = await API({
  //   method: 'GET',
  //   url: `HomeBuilder/FloorPlansByLot/${dirName}/${fileName}.json`
  // })
  //   .then(({ data }) => {
  //     return data;
  //   })
  //   .catch(err => {
  //     return err;
  //   });

  const response = await data;
  return response;
};

export const fetchResults = activeFilters => async dispatch => {
  try {
    dispatch(getResultsStart());
    const results = await fetchResultsFromDatabase(activeFilters);
    setTimeout(() => {
      dispatch(getResultsSuccess(results));
    }, 600);
  } catch (error) {
    const errorString = error.toString();
    dispatch(getResultsFailure(errorString));
  }
};
