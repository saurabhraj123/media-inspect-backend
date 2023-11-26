/** External */
import { ZodError } from "zod";
import _ from "lodash";

/** Internal */
import { Error } from "../types";

export const getFormattedErrors = (zodError: ZodError): Error[] => {
  const formattedErrors = zodError.issues.map((issue) => {
    let errorMessage: Error = { path: _.get(issue, "path[0]") };

    switch (issue.code) {
      case "invalid_type":
        const msg = `${_.get(issue, "path[0]")} is required!`;
        errorMessage.message = msg;
        break;
      default:
        errorMessage.message = issue.message;
    }

    return errorMessage;
  });

  return formattedErrors;
};
