import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers/rootReducer', () => {
    const newRootReducer = require('../reducers/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
