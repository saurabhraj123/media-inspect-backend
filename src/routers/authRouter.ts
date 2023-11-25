/** External */
import express from "express";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import _ from "lodash";

/** Internal */
import { ApiError } from "../types";
import prisma from "../config/prisma";
import {
  getFormattedErrors,
  generateAuthToken,
  getError,
  getSingleErrorObjectArray,
} from "../utils";
import {
  SERVER_ERROR,
  CONFLICT_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
} from "../constants/errors";
import { SALT_ROUNDS } from "../constants/common";

const router = express.Router();

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const UserSignupSchema = UserLoginSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

type UserSignupInput = z.infer<typeof UserSignupSchema>;
type UserLoginInput = z.infer<typeof UserLoginSchema>;

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } =
      req.body as UserSignupInput;

    // input validation
    const { success, error } = UserSignupSchema.safeParse(req.body) as {
      success: Boolean;
      error: ZodError;
    };

    if (!success) {
      const validationError = getError<ApiError>(
        VALIDATION_ERROR,
        getFormattedErrors(error)
      );

      return res.status(400).send({
        error: validationError,
      });
    }

    // user already exists
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      const duplicateEmailError = getError<ApiError>(
        CONFLICT_ERROR,
        getSingleErrorObjectArray("User already exists")
      );

      return res.status(400).send({
        error: duplicateEmailError,
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // generate token with the payload
    const payload = {
      id: newUser.id,
      email,
      firstName,
      lastName,
      isEmailVerified: newUser.isEmailVerified,
    };

    const token = generateAuthToken(payload);

    res.send({ token });
  } catch (err) {
    const internalServerError = getError<ApiError>(
      SERVER_ERROR,
      getSingleErrorObjectArray("Internal server error!")
    );

    res.status(500).send({ error: internalServerError });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body as UserLoginInput;

    // input validation
    const { success, error } = UserLoginSchema.safeParse(req.body) as {
      success: Boolean;
      error: ZodError;
    };

    if (!success) {
      const validationError = getError<ApiError>(
        VALIDATION_ERROR,
        getFormattedErrors(error)
      );

      return res.status(400).send({
        error: validationError,
      });
    }

    // validate credentials
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const invalidEmailError = getError<ApiError>(
        NOT_FOUND_ERROR,
        getSingleErrorObjectArray("Email is not registered", "email")
      );

      return res.status(400).send({
        error: invalidEmailError,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const invalidPasswordError = getError<ApiError>(
        NOT_FOUND_ERROR,
        getSingleErrorObjectArray("Incorrect password", "password")
      );

      return res.status(400).send({
        error: invalidPasswordError,
      });
    }

    // generate token with the payload
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
    };

    const token = generateAuthToken(payload);

    res.send({ token });
  } catch (err) {}
});

export default router;
