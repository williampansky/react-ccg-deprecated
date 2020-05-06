import { createSlice } from '@reduxjs/toolkit';

let initialState = false;

const siteSidebarSlice = createSlice({
  name: 'siteSidebar',
  initialState,
  reducers: {
    setSiteSidebar(state, { payload }) {
      return payload;
    },
    toggleSiteSidebar(state) {
      return state === true ? false : true;
    }
  }
});

export const { setSiteSidebar, toggleSiteSidebar } = siteSidebarSlice.actions;
export default siteSidebarSlice.reducer;
