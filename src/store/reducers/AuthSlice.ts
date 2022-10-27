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
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload, type }: PayloadAction<ILoginResponse>) {
      state = { ...payload, isAuth: true };
    },
  },
});

export const authReducer = authSlice.reducer;
