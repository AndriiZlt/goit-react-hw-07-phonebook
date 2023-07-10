import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { contactsSlice, filterSlice } from './slice';

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const { changeFilter } = filterSlice.actions;

export default contactsSlice.reducer;
