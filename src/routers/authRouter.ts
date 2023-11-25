/** External */
import express from "express";
import { z } from "zod";
import _ from "lodash";

/** Internal */
import { Error } from "../types";
import prisma from "../config/prisma";
import { formatZodError, generateAuthToken } from "../utils";
import {
  SERVER_ERROR,
  CONFLICT_ERROR,
  VALIDATION_ERROR,
} from "../constants/errors";

const router = express.Router();

const UserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

type UserSignupInput = z.infer<typeof UserSchema>;

type SignupError = {
  type: string;
  errors: Error[];
};

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } =
      req.body as UserSignupInput;

    // input validation
    const validationResult = UserSchema.safeParse(req.body);
    if (!validationResult.success) {
      const signupError: SignupError = {
        type: VALIDATION_ERROR,
        errors: formatZodError(validationResult.error),
      };

      return res.status(400).send({
        error: signupError,
      });
    }

    // user already exists
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      const signupError: SignupError = {
        type: CONFLICT_ERROR,
        errors: [{ message: "User already exists" }],
      };

      return res.status(400).send({
        error: signupError,
      });
    }

    // create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      firstName,
      lastName,
      isEmailVerified: newUser.isEmailVerified,
    };

    const token = generateAuthToken(payload);

    res.json({ token });
  } catch (err) {
    const error: SignupError = {
      type: SERVER_ERROR,
      errors: [{ message: "Something went wrong" }],
    };
    res.status(500).send({ error });
  }
});

export default router;
