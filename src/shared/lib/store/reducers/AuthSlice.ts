import { IAuthInitialState, ILoginResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthInitialState = {
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresIn: -1,
  refreshTokenExpiresIn: -1,
};

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    clearState() {
      localStorage.removeItem('tokensData');

      return { ...initialState, isAuth: false };
    },
    setNotAuth(state) {
      state.isAuth = false;
    },
    setAuth(state, { payload }: PayloadAction<ILoginResponse>) {
      localStorage.setItem('tokensData', JSON.stringify(payload));

      console.log('tut');

      return {
        isAuth: true,
        ...payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
