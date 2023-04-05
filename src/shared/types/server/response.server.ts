export type APIMessageErrorType = { message: string }[];

export interface IAPIResponseError {
  errors: APIMessageErrorType;
}

export interface ISuccessResponseStatus {
  status: string;
}
