import { ISetEmailCodeExpiresIn, ISetEmailInput } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserDataState {
  email: string;
  emailCodeExpiresIn: number;
}

const initialState: IUserDataState = {
  email: '',
  emailCodeExpiresIn: -1,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearState() {
      localStorage.removeItem('userData');

      return { ...initialState };
    },
    setEmail(state, { payload }: PayloadAction<ISetEmailInput>) {
      state.email = payload.email;
    },
    setEmailCodeExpiresIn(state, { payload }: PayloadAction<ISetEmailCodeExpiresIn>) {
      localStorage.setItem('userData', JSON.stringify({ email: state.email }));

      state.emailCodeExpiresIn = payload.emailCodeExpiresIn;
    },
  },
});

export const { reducer: userDataReducer, actions: userDataActions } = userDataSlice;
