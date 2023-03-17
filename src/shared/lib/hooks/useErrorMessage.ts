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
    let message: string | undefined = '';

    if (isSerializedError(errorData)) {
      message = errorData.message;
    }

    if (isFetchBaseQueryError(errorData)) {
      const { status, data } = errorData;

      if ((status === 200 || status === 400 || status === 401) && isIAPIResponseError(data)) {
        message = data.errors[0].message;
      }
    }

    return message || 'Error sending data, please try again later.';
  }, [errorData]);

  return errorMessage;
};
