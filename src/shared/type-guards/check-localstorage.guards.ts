import { IJwtTokensPayload, LocalStorageUserData } from '../types';
import { isObject } from './javascript.guards';

export const isUserData = (value: unknown): value is LocalStorageUserData => {
  if (isObject(value) && 'email' in value && typeof value.email === 'string') {
    return true;
  }

  return false;
};

export const isTokensData = (value: unknown): value is IJwtTokensPayload => {
  if (
    isObject(value) &&
    'accessToken' in value &&
    'refreshToken' in value &&
    'accessTokenExpiresIn' in value &&
    'refreshTokenExpiresIn' in value &&
    typeof value.accessToken === 'string' &&
    typeof value.refreshToken === 'string' &&
    typeof value.accessTokenExpiresIn === 'number' &&
    typeof value.refreshTokenExpiresIn === 'number'
  ) {
    return true;
  }

  return false;
};
