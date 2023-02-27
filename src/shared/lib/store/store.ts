import { authAPI } from '@cc/shared/api';
import { calculatorAPI } from '@cc/shared/api/CalculatorService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, baseCalculatorReducer, userDataReducer } from './reducers';

const rootReducer = combineReducers({
  authReducer,
  userDataReducer,
  baseCalculatorReducer,

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
