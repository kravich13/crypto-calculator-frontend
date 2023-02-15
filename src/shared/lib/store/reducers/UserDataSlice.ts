import { ISetCodeInput, ISetEmailInput } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    clearState() {
      return { ...initialState };
    },
    setEmail(state, { payload }: PayloadAction<ISetEmailInput>) {
      state.email = payload.email;
    },
    setCode(state, { payload }: PayloadAction<ISetCodeInput>) {
      state.code = payload.code;
    },
  },
});

export const userDataReducer = userDataSlice.reducer;
