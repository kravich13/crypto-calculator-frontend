import { isTokensData, isUserData } from '../check-localstorage.guards';

describe('javascript guard isUserData', () => {
  it('should return true for valid user data', () => {
    const validUserData = {
      email: 'test@example.com',
    };

    const result = isUserData(validUserData);

    expect(result).toBe(true);
  });

  it('should return false for invalid user data', () => {
    const invalidUserData1 = null;
    const invalidUserData2 = undefined;
    const invalidUserData3 = 42;
    const invalidUserData4 = { name: 'John' };
    const invalidUserData5 = { email: 12345 };

    const result1 = isUserData(invalidUserData1);
    const result2 = isUserData(invalidUserData2);
    const result3 = isUserData(invalidUserData3);
    const result4 = isUserData(invalidUserData4);
    const result5 = isUserData(invalidUserData5);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
    expect(result5).toBe(false);
  });
});

describe('javascript guard isTokensData', () => {
  it('should return true for valid tokens data', () => {
    const validTokensData = {
      accessToken: 'randomAccessToken',
      refreshToken: 'randomRefreshToken',
      accessTokenExpiresIn: 3600,
      refreshTokenExpiresIn: 86400,
    };

    const result = isTokensData(validTokensData);

    expect(result).toBe(true);
  });

  it('should return false for invalid tokens data', () => {
    const invalidTokensData1 = null;
    const invalidTokensData2 = undefined;
    const invalidTokensData3 = 42;
    const invalidTokensData4 = { accessToken: 'test' };
    const invalidTokensData5 = {
      accessToken: 'randomAccessToken',
      refreshToken: 'randomRefreshToken',
      accessTokenExpiresIn: '3600',
      refreshTokenExpiresIn: 86400,
    };

    const result1 = isTokensData(invalidTokensData1);
    const result2 = isTokensData(invalidTokensData2);
    const result3 = isTokensData(invalidTokensData3);
    const result4 = isTokensData(invalidTokensData4);
    const result5 = isTokensData(invalidTokensData5);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
    expect(result5).toBe(false);
  });
});
