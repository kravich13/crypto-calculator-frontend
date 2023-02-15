import { authAPI } from '@cc/shared/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, calculatorReducer, userDataReducer } from './reducers';

const rootReducer = combineReducers({
  authReducer,
  userDataReducer,
  calculatorReducer,

  [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
