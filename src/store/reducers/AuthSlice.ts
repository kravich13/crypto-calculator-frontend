import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginResponse } from '../../models/Auth';

interface IAuthState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

const initialState: IAuthState = {
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
    clearState(state, { payload, type }) {
      return { ...initialState };
    },
    setAuth(state, { payload, type }: PayloadAction<ILoginResponse>) {
      return {
        isAuth: true,
        ...payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
