import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'
import catalogReducer from './reducers/catalogSlice'

export const store = configureStore({
  reducer: {
      // user: userReducer,
    catalog: catalogReducer
  },
});
