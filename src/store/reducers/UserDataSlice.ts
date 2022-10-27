import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetEmailInput } from '../../models/UserData';

interface IUserDataState {
  email: string;
}

const initialState: IUserDataState = {
  email: '',
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setEmail(state, { payload, type }: PayloadAction<ISetEmailInput>) {
      state.email = payload.email;
    },
  },
});

export const userDataReducer = userDataSlice.reducer;
