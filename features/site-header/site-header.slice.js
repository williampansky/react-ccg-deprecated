import { createSlice } from '@reduxjs/toolkit';

let initialState = {};

const siteHeaderSlice = createSlice({
  name: 'siteHeader',
  initialState,
  reducers: {}
});

// export const {} = siteHeaderSlice.actions;
export default siteHeaderSlice.reducer;
