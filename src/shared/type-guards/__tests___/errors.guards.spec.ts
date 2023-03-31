import { APIMessageErrorType } from '@cc/shared/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import {
  isFetchBaseQueryError,
  isIAPIResponseError,
  isInstanceOfMessageError,
  isSerializedError,
} from '../errors.guards';

describe('error guard isSerializedError', () => {
  it('should return true if value is a SerializedError object', () => {
    const value: SerializedError = {
      name: 'Error',
      message: 'Error message',
      stack: 'Error stack',
      code: 'Error code',
    };
    const result = isSerializedError(value);

    expect(result).toBe(true);
  });

  it('should return false if value is not an object', () => {
    const value = 'not an object';
    const result = isSerializedError(value);

    expect(result).toBe(false);
  });

  it('should return false if value is an empty object', () => {
    const value = {};
    const result = isSerializedError(value);

    expect(result).toBe(false);
  });

  it('should return false if value is an object without required properties', () => {
    const value = { name: 'Error', message: 'Error message' };
    const result = isSerializedError(value);

    expect(result).toBe(false);
  });

  it('should return false if value is an object with wrong property types', () => {
    const value = { name: 123, message: 456, stack: false, code: null };
    const result = isSerializedError(value);

    expect(result).toBe(false);
  });
});

describe('error guard isFetchBaseQueryError', () => {
  it('should return true if value is a FetchBaseQueryError', () => {
    const value: FetchBaseQueryError = { data: {}, status: 404 };

    expect(isFetchBaseQueryError(value)).toBe(true);
  });

  it('should return false if value is not an object', () => {
    const value = 123;

    expect(isFetchBaseQueryError(value)).toBe(false);
  });

  it('should return false if value does not have "status" property', () => {
    const value = { data: {} };

    expect(isFetchBaseQueryError(value)).toBe(false);
  });

  it('should return false if value does not have "data" property', () => {
    const value = { status: 404 };

    expect(isFetchBaseQueryError(value)).toBe(false);
  });

  it('should return false if value has a non-numeric "status" property', () => {
    const value = { data: {}, status: '404' };

    expect(isFetchBaseQueryError(value)).toBe(false);
  });
});

describe('error guard instanceOfMessageError', () => {
  it('should return true for an array of objects with a "message" string property', () => {
    const input: APIMessageErrorType = [{ message: 'Error 1' }, { message: 'Error 2' }];
    const result = isInstanceOfMessageError(input);

    expect(result).toBe(true);
  });

  it('should return false for an empty array', () => {
    const input: APIMessageErrorType = [];
    const result = isInstanceOfMessageError(input);

    expect(result).toBe(false);
  });

  it('should return false for an array with non-object items', () => {
    const input = [null, undefined, 42, 'string'];
    const result = isInstanceOfMessageError(input);

    expect(result).toBe(false);
  });

  it('should return false for an array with objects that do not have a "message" string property', () => {
    const input = [{}, { foo: 'bar' }, { message: 42 }];
    const result = isInstanceOfMessageError(input);
    expect(result).toBe(false);
  });
});

describe('error guard isIAPIResponseError', () => {
  it('should return true for a valid IAPIResponseError object', () => {
    const validIAPIResponseError = { errors: [{ message: 'Error 1' }] };

    expect(isIAPIResponseError(validIAPIResponseError)).toBe(true);
  });

  it('should return false for an object that does not have errors property', () => {
    const invalidIAPIResponseError = { data: { message: 'Error' } };

    expect(isIAPIResponseError(invalidIAPIResponseError)).toBe(false);
  });

  it('should return false for an object that has errors property which is not an array', () => {
    const invalidIAPIResponseError = { errors: 'not an array' };

    expect(isIAPIResponseError(invalidIAPIResponseError)).toBe(false);
  });

  it('should return false for an object that has errors property which is an array of invalid objects', () => {
    const invalidIAPIResponseError = { errors: [{ notMessage: 'Error 1' }] };

    expect(isIAPIResponseError(invalidIAPIResponseError)).toBe(false);
  });

  it('should return false for a non-object value', () => {
    expect(isIAPIResponseError('not an object')).toBe(false);
    expect(isIAPIResponseError(123)).toBe(false);
    expect(isIAPIResponseError(null)).toBe(false);
    expect(isIAPIResponseError(undefined)).toBe(false);
  });
});
