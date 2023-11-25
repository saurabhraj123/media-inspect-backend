import { Error } from "../types";

export const getError = <ErrorType>(type: string, errors: Error[]) => {
  return {
    type,
    errors,
  } as ErrorType;
};

export const getSingleErrorObjectArray = (message: string, path?: string) => {
  return [
    {
      path,
      message,
    },
  ];
};
