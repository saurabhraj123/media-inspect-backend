export interface Error {
  path?: string | number;
  message?: string;
}

export interface ApiError {
  type: string;
  errors: Error[];
}
