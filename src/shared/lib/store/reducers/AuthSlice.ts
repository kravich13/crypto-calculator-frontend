import { IAuthInitialState, IJwtTokensPayload } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialTokens: IJwtTokensPayload = {
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresIn: -1,
  refreshTokenExpiresIn: -1,
};

const initialState: IAuthInitialState = { ...initialTokens };

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setNotAuth() {
      localStorage.removeItem('tokensData');

      return { ...initialTokens, isAuth: false };
    },
    setAuth(state, { payload }: PayloadAction<IJwtTokensPayload>) {
      localStorage.setItem('tokensData', JSON.stringify(payload));

      return {
        isAuth: true,
        ...payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
