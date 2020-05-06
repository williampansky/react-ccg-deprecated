import { createSlice } from '@reduxjs/toolkit';

let initialState = false;

const siteMobileMenuSlice = createSlice({
  name: 'siteMobileMenu',
  initialState,
  reducers: {
    setMobileMenu(state, { payload }) {
      return payload;
    },
    toggleMobileMenu(state) {
      return state === true ? false : true;
    }
  }
});

export const { setMobileMenu, toggleMobileMenu } = siteMobileMenuSlice.actions;
export default siteMobileMenuSlice.reducer;
