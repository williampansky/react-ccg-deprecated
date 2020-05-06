import { combineReducers } from '@reduxjs/toolkit';

import configSlice from '@/features/config.slice';
import constantsSlice from '@/features/constants.slice';
import databaseSlice from '@/features/database.slice';
import filtersSlice from '@/features/filters/filters.slice';
import filteredResultsSlice from '@/features/filtered-results.slice';
// import routesSlice from 'features/routes.slice';
// import sidebarSlice from 'features/sidebar/sidebar.slice';
import decksSlice from '@/features/decks/decks.slice';

const rootReducer = combineReducers({
  config: configSlice,
  // routes: routesSlice,
  filters: filtersSlice,
  filteredResults: filteredResultsSlice,
  database: databaseSlice,
  constants: constantsSlice,
  // sidebar: sidebarSlice,
  decks: decksSlice
});

export default rootReducer;
