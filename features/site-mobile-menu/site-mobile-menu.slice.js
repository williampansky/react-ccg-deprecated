import { createSlice } from '@reduxjs/toolkit';
import exists from '@/utils/element.exists';

let initialState = false;

const siteMobileMenuSlice = createSlice({
  name: 'siteMobileMenu',
  initialState,
  reducers: {
    setMobileMenu(state, { payload }) {
      return payload;
    },
    toggleMobileMenu(state) {
      if (exists(document))
        state === true
          ? document.body.classList.remove('noscroll')
          : document.body.classList.add('noscroll');

      return state === true ? false : true;
    }
  }
});

export const { setMobileMenu, toggleMobileMenu } = siteMobileMenuSlice.actions;
export default siteMobileMenuSlice.reducer;
