/** External */
import jwt, { Secret } from "jsonwebtoken";

const generateAuthToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret);
};

export { generateAuthToken };
