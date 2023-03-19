import { authAPI, calculatorAPI } from '@cc/shared/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { authReducer, calculatorReducer, profitReducer, userDataReducer } from './reducers';

export const rootReducer = combineReducers({
  authReducer,
  userDataReducer,
  baseCalculatorReducer: calculatorReducer,
  profitReducer,

  [authAPI.reducerPath]: authAPI.reducer,
  [calculatorAPI.reducerPath]: calculatorAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, calculatorAPI.middleware),
    devTools: true,
  });

export const wrapper = createWrapper(setupStore);
