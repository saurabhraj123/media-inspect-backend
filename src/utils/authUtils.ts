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

export { generateAuthToken, sendVerificationMail };
