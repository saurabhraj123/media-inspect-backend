/** External */
import crypto from "crypto";

/** Internal */
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

export const generateEmailVerificationToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};
