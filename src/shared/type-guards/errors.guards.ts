import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IAPIResponseError } from '../types';
import { isObject } from './javascript.guards';

export const isSerializedError = (value: unknown): value is SerializedError => {
  if (!isObject(value)) {
    return false;
  }

  if (
    'name' in value &&
    'message' in value &&
    'stack' in value &&
    'code' in value &&
    typeof value.name === 'string' &&
    typeof value.message === 'string' &&
    typeof value.stack === 'string' &&
    typeof value.code === 'string'
  ) {
    return true;
  }

  return false;
};

export const isFetchBaseQueryError = (value: unknown): value is FetchBaseQueryError => {
  if (!isObject(value)) {
    return false;
  }

  const isStatus = 'status' in value;
  const isData = 'data' in value;

  if (isStatus && isData && typeof value.status === 'number') {
    return true;
  }

  return false;
};

interface IMessageError {
  message: string;
}

export function instanceOfMessageError(value: unknown): value is IMessageError[] {
  if (!isObject(value)) {
    return false;
  }

  if ('message' in value && typeof value.message === 'string') {
    return true;
  }

  return false;
}

export const isIAPIResponseError = (value: unknown): value is IAPIResponseError => {
  if (!isObject(value)) {
    return false;
  }

  if ('errors' in value && Array.isArray(value.errors) && instanceOfMessageError(value.errors)) {
    value.errors;
  }

  return true;
};
