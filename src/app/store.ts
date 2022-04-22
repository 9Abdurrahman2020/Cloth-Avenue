import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storeReducer from '../features/counter/storeSlice';

export const store = configureStore({
  reducer: {
    clothStore: storeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
