import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '@/enums/CONSTANTS.json';

let initialState = Object.keys(CONSTANTS)
  .map(i => CONSTANTS[i])
  .sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const constantsSlice = createSlice({
  name: 'constants',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = constantsSlice.actions;
export default constantsSlice.reducer;
