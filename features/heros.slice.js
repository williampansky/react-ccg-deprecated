import { createSlice } from '@reduxjs/toolkit';
import HEROS from '@/enums/HEROS.json';

let initialState = Object.keys(HEROS)
  .map(i => HEROS[i])
  .sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const herosSlice = createSlice({
  name: 'heros',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = herosSlice.actions;
export default herosSlice.reducer;
