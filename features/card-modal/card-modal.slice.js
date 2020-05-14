import { createSlice } from '@reduxjs/toolkit';

let initialState = null;

const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    setData(state, { payload }) {
      return payload;
    }
  }
});

export const { setData } = cardModalSlice.actions;
export default cardModalSlice.reducer;
