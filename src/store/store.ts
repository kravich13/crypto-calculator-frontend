import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI, emailAPI } from '../services';
import { authReducer, userDataReducer } from './reducers';

const rootReducer = combineReducers({
  authReducer,
  userDataReducer,

  [authAPI.reducerPath]: authAPI.reducer,
  [emailAPI.reducerPath]: emailAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
