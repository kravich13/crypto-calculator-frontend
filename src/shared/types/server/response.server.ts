export interface IAPIResponseError {
  errors: {
    message: string;
  }[];
}

export interface ISuccessResponseStatus {
  status: string;
}
