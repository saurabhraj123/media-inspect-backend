/** External */
import jwt, { Secret } from "jsonwebtoken";
import emailjs from "@emailjs/nodejs";

const generateAuthToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret);
};

const sendVerificationMail = async (params: {
  email: string;
  name: string;
  verificationLink: string;
}) => {
  await emailjs.send(
    process.env.EMAIL_JS_SERVICE_ID as string,
    process.env.EMAIL_JS_TEMPLATE_ID as string,
    params,
    {
      publicKey: process.env.EMAIL_JS_PUBLIC_KEY as string,
      privateKey: process.env.EMAIL_JS_PRIVATE_KEY as string,
    }
  );
};

const validateAndDecodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return decoded;
  } catch (error) {
    return null;
  }
};

const validateUser = (authorizationHeader: string) => {
  if (!authorizationHeader) return null;

  try {
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") return null;

    const user = validateAndDecodeToken(token);

    return user;
  } catch (err) {
    return null;
  }
};

export { generateAuthToken, sendVerificationMail, validateUser };
