import {
  isFetchBaseQueryError,
  isIAPIResponseError,
  isSerializedError,
} from '@cc/shared/type-guards';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

export const useErrorMessage = (errorData?: FetchBaseQueryError | SerializedError) => {
  const errorMessage = useMemo(() => {
    let message = '';

    if (isSerializedError(errorData)) {
      message = errorData.message || '';
    } else if (isFetchBaseQueryError(errorData)) {
      const { status, data } = errorData;

      if ((status === 200 || status === 400 || status === 401) && isIAPIResponseError(data)) {
        const errorMessage = data.errors[0].message;

        if (
          !(
            errorMessage.includes('Invalid access token') ||
            errorMessage.includes('Invalid refresh token')
          )
        ) {
          message = errorMessage;
        }
      } else {
        message = 'Error sending data, please try again later.';
      }
    } else if (Boolean(errorData)) {
      message = 'Error sending data, please try again later.';
    }

    return message;
  }, [errorData]);

  return errorMessage;
};
