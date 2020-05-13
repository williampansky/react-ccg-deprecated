import { combineReducers } from '@reduxjs/toolkit';

import configSlice from '@/features/config.slice';
import constantsSlice from '@/features/constants.slice';
import databaseSlice from '@/features/database.slice';
import filtersSlice from '@/features/filters/filters.slice';
import filteredResultsSlice from '@/features/filtered-results.slice';
import herosSlice from '@/features/heros.slice';
import mechanicsSlice from '@/features/mechanics.slice';
// import routesSlice from 'features/routes.slice';
import siteMobileMenuSlice from 'features/site-mobile-menu/site-mobile-menu.slice';
import siteSidebarSlice from 'features/site-sidebar/site-sidebar.slice';
import decksSlice from '@/features/decks/decks.slice';

const rootReducer = combineReducers({
  config: configSlice,
  // routes: routesSlice,
  filters: filtersSlice,
  filteredResults: filteredResultsSlice,
  database: databaseSlice,
  constants: constantsSlice,
  heros: herosSlice,
  mechanics: mechanicsSlice,
  siteMobileMenuActive: siteMobileMenuSlice,
  siteSidebarActive: siteSidebarSlice,
  decks: decksSlice
});

export default rootReducer;
