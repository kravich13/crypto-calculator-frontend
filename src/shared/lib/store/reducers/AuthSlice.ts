import { ILoginResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITokensData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

interface IAuthState extends ITokensData {
  isAuth?: boolean;
}

const initialState: IAuthState = {
  isAuth: undefined,
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

      return { ...initialState };
    },
    setNotAuth(state) {
      state.isAuth = false;
    },
    setAuth(state, { payload }: PayloadAction<ILoginResponse>) {
      localStorage.setItem('tokensData', JSON.stringify(payload));

      return {
        isAuth: true,
        ...payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
