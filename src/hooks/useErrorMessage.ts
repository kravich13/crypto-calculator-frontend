import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';
import { IDataErrors } from '../models';

export const useErrorMessage = (errorData?: FetchBaseQueryError | SerializedError) => {
  const errorMessage = useMemo(() => {
    let message = '';

    if (errorData) {
      const { data, status, originalStatus } = errorData as any;
      console.log(data);

      if ((status === 200 || originalStatus === 200) && (data as IDataErrors)?.errors) {
        const [errorData] = (data as IDataErrors).errors;
        message = errorData.message;
      } else {
        message = 'Error sending data, please try again later.';
      }
    }

    return message;
  }, [errorData]);

  return errorMessage;
};
