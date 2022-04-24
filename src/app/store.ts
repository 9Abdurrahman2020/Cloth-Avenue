import { Action, createStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import storeReducer from '../features/counter/storeSlice';

const persistConfig = {
  key: 'clothStore',
  storage,
}
const persistedReducer = persistReducer(persistConfig, storeReducer)
export const store = createStore(persistedReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
