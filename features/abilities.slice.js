import { createSlice } from '@reduxjs/toolkit';
import ABILITIES from '@/enums/ABILITIES.json';

let initialState = Object.keys(ABILITIES).map(i => ABILITIES[i]);

const abilitiesSlice = createSlice({
  name: 'abilities',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = abilitiesSlice.actions;
export default abilitiesSlice.reducer;
