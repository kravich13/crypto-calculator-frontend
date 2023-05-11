import { IUserDataInitialState, ThemeMode } from '@cc/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUserDataInitialState = {
  theme: 'light',
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearState() {
      localStorage.removeItem('themeMode');

      return { ...initialState };
    },

    setTheme(state, { payload }: PayloadAction<ThemeMode>) {
      localStorage.setItem('themeMode', JSON.stringify({ email: payload }));

      state.theme = payload;
    },
  },
});

export const { reducer: userDataReducer, actions: userDataActions } = userDataSlice;
