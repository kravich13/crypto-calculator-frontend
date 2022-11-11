import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetCodeInput, ISetEmailInput } from '../../models/UserData';

interface IUserDataState {
  email: string;
  code: string;
}

const initialState: IUserDataState = {
  email: '',
  code: '',
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearState(state) {
      return { ...initialState };
    },
    setEmail(state, { payload, type }: PayloadAction<ISetEmailInput>) {
      state.email = payload.email;
    },
    setCode(state, { payload, type }: PayloadAction<ISetCodeInput>) {
      state.code = payload.code;
    },
  },
});

export const userDataReducer = userDataSlice.reducer;
