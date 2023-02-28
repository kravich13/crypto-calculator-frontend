export interface IResponseError {
  errors: {
    message: string;
  }[];
}

export interface ISuccessResponseStatus {
  status: string;
}
