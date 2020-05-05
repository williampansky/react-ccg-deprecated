import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from '@/lib/utils/card-databse';

let initialState = Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]);

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = databaseSlice.actions;
export default databaseSlice.reducer;
