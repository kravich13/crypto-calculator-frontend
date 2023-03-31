import {
  isFetchBaseQueryError,
  isIAPIResponseError,
  isSerializedError,
} from '@cc/shared/type-guards';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

interface IResult {
  showError: boolean;
  message: string;
}

export const useErrorMessage = (errorData?: FetchBaseQueryError | SerializedError) =>
  useMemo(() => {
    const result: IResult = { message: '', showError: false };

    if (isSerializedError(errorData)) {
      result.message = errorData.message || '';
      result.showError = Boolean(errorData.message);
    } else if (isFetchBaseQueryError(errorData)) {
      const { status, data } = errorData;

      if ((status === 200 || status === 400 || status === 401) && isIAPIResponseError(data)) {
        const errorMessage = data.errors[0].message;

        if (
          errorMessage.includes('Invalid access token') ||
          errorMessage.includes('Invalid refresh token')
        ) {
          result.message = errorMessage;
        } else {
          result.message = errorMessage;
          result.showError = true;
        }
      } else {
        result.message = 'Error sending data, please try again later.';
        result.showError = true;
      }
    } else if (Boolean(errorData)) {
      result.message = 'Error sending data, please try again later.';
      result.showError = true;
    }

    return result;
  }, [errorData]);
