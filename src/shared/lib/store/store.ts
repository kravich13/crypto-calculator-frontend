import { authAPI, calculatorAPI } from '@cc/shared/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, baseCalculatorReducer, profitReducer, userDataReducer } from './reducers';

const rootReducer = combineReducers({
  authReducer,
  userDataReducer,
  baseCalculatorReducer,
  profitReducer,

  [authAPI.reducerPath]: authAPI.reducer,
  [calculatorAPI.reducerPath]: calculatorAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, calculatorAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
