import { userDataActions, userDataReducer } from '../UserDataSlice';

describe('userData reducer', () => {
  const initialState = {
    email: '',
    emailCodeExpiresIn: -1,
  };

  it('should return the initial state', () => {
    expect(userDataReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearState', () => {
    expect(userDataReducer(initialState, userDataActions.clearState())).toEqual(initialState);
  });

  it('should handle setEmail', () => {
    const email = 'test@example.com';
    const action = userDataActions.setEmail({ email });
    const newState = userDataReducer(initialState, action);

    expect(newState.email).toEqual(email);
  });

  it('should handle setEmailCodeExpiresIn', () => {
    const emailCodeExpiresIn = 120;
    const action = userDataActions.setEmailCodeExpiresIn({ emailCodeExpiresIn });
    const newState = userDataReducer(initialState, action);

    expect(newState.emailCodeExpiresIn).toEqual(emailCodeExpiresIn);
  });
});
