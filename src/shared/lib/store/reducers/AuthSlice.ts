import {
  IAuthInitialState,
  IJwtTokensPayload,
  ISetEmailCodeResendExpiresIn,
  ISetEmailInput,
} from '@cc/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IAuthInitialState = {
  email: '',
  accessToken: '',
  refreshToken: '',
  emailCodeResendExpiresIn: -1,
  accessTokenExpiresIn: -1,
  refreshTokenExpiresIn: -1,
};

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setNotAuth() {
      localStorage.removeItem('tokensData');
      localStorage.removeItem('userData');

      return { ...initialState, isAuth: false };
    },

    setAuth(state, { payload }: PayloadAction<IJwtTokensPayload>) {
      localStorage.setItem('tokensData', JSON.stringify(payload));

      state.isAuth = true;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.accessTokenExpiresIn = payload.accessTokenExpiresIn;
      state.refreshTokenExpiresIn = payload.refreshTokenExpiresIn;
    },

    setEmail(state, { payload }: PayloadAction<ISetEmailInput>) {
      state.email = payload.email;
    },

    setEmailCodeResendExpiresIn(state, { payload }: PayloadAction<ISetEmailCodeResendExpiresIn>) {
      localStorage.setItem('userData', JSON.stringify({ email: state.email }));

      state.emailCodeResendExpiresIn = payload.emailCodeResendExpiresIn;
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
