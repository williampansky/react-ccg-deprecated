import { createSlice } from '@reduxjs/toolkit';

let initialState = false;

const siteSidebarSlice = createSlice({
  name: 'siteSidebar',
  initialState,
  reducers: {
    setSiteSidebar(state, { payload }) {
      state.sidebarActive = payload;
    },
    toggleSiteSidebar(state) {
      state.sidebarActive = state.sidebarActive === true ? false : true;
    }
  }
});

export const { setSiteSidebar, toggleSiteSidebar } = siteSidebarSlice.actions;
export default siteSidebarSlice.reducer;
