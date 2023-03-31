import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { renderHook } from '@testing-library/react';
import { useErrorMessage } from '../useErrorMessage';
import { IAPIResponseError } from '@cc/shared/types';

describe('useErrorMessage', () => {
  const defaultErrorMessage = 'Error sending data, please try again later.';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns an empty string when errorData is undefined', () => {
    const { result } = callRenderHook();

    expect(result.current).toEqual(shouldBeValue({}));
  });

  it('should return error message when error data is SerializedError', () => {
    const input: SerializedError = {
      code: '200',
      message: 'wrong',
      name: 'kravich',
      stack: 'test',
    };

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'wrong', showError: true }));
  });

  it('should return error message from serverAPI when status === 200', () => {
    const input = mockAPIResponse(200);

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'logout', showError: true }));
  });

  it('should return error message from serverAPI when status === 400', () => {
    const input = mockAPIResponse(400);

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'logout', showError: true }));
  });

  it('should return error message from serverAPI when status === 401', () => {
    const input = mockAPIResponse(401);

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'logout', showError: true }));
  });

  it('should return error message from serverAPI when message === Invalid access token', () => {
    const input = mockAPIResponse(401, 'Invalid access token');

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'Invalid access token' }));
  });

  it('should return error message from serverAPI when message === Invalid refresh token', () => {
    const input = mockAPIResponse(401, 'Invalid refresh token');

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(shouldBeValue({ message: 'Invalid refresh token' }));
  });

  it('should return default error message if errorData === FetchBaseQueryError && !== serverAPI', () => {
    const input: FetchBaseQueryError = { status: 400, data: 'test data' };

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(
      shouldBeValue({ message: defaultErrorMessage, showError: true })
    );
  });

  it('should return default error message errorData !== any type', () => {
    const input = { message: 'test message' };

    const { result } = callRenderHook(input);

    expect(result.current).toEqual(
      shouldBeValue({ message: defaultErrorMessage, showError: true })
    );
  });

  interface IShouldBeValue {
    message?: string;
    showError?: boolean;
  }

  function callRenderHook(errorData?: FetchBaseQueryError | SerializedError) {
    return renderHook(() => useErrorMessage(errorData));
  }

  function mockAPIResponse(status: number, message: string = 'logout'): FetchBaseQueryError {
    return {
      status,
      data: {
        errors: [{ message }],
      } as IAPIResponseError,
    };
  }

  function shouldBeValue({ message = '', showError = false }: IShouldBeValue): IShouldBeValue {
    return { message, showError };
  }
});
