import { IResponseError } from '@cc/shared/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

export const useErrorMessage = (errorData?: FetchBaseQueryError | SerializedError) => {
  const errorMessage = useMemo(() => {
    let message = '';

    if (errorData) {
      const { data, status, originalStatus } = errorData as any;

      if ((status === 200 || originalStatus === 200) && (data as IResponseError)?.errors) {
        const [errorData] = (data as IResponseError).errors;
        message = errorData.message;
      } else if (status === 400 || status === 401) {
        const [errorData] = (data as IResponseError).errors;

        message = errorData.message;
      } else {
        message = 'Error sending data, please try again later.';
      }
    }

    return message;
  }, [errorData]);

  return errorMessage;
};
