import { IUserDataInitialState } from '@cc/shared/types';
import { userDataActions, userDataReducer } from '../UserDataSlice';

describe('userData reducer', () => {
  const initialState: IUserDataInitialState = {
    theme: 'light',
  };

  it('should return the initial state', () => {
    expect(userDataReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearState', () => {
    expect(userDataReducer(initialState, userDataActions.clearState())).toEqual(initialState);
  });

  it('should handle setTheme', () => {
    const action = userDataActions.setTheme('dark');
    const newState = userDataReducer(initialState, action);

    expect(newState.theme).toEqual('dark');
  });
});
