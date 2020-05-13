import { createSlice } from '@reduxjs/toolkit';
import MECHANICS from '@/enums/MECHANICS.json';

let initialState = Object.keys(MECHANICS)
  .map(i => MECHANICS[i])
  .sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const mechanicsSlice = createSlice({
  name: 'mechanics',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = mechanicsSlice.actions;
export default mechanicsSlice.reducer;
