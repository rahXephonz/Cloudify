import { Context } from "@interface/db";
import { SignInArgs, SignUpArgs, UserPayloadType } from "@interface/auth";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import gravatarUrl from "gravatar-url";

// you must create jwt_secret in your env file
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authResolvers = {
  signup: async (
    _: any,
    { name, credentials }: SignUpArgs,
    { db }: Context
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;

    // validating true email
    const isEmail = validator.isEmail(email);
    // validating password for length of password
    const isValidPassword = validator.isLength(password, { min: 7 });
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // get random url gravatar
    const gravatar = gravatarUrl(email, { default: "retro", size: 200 });

    // Check if there is a user with the same email
    const foundUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return {
        userErrors: [
          {
            message: "Email is already in use",
          },
        ],
        account: null,
        token: null,
      };
    }

    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "Please provide valid email",
          },
        ],
        token: null,
        account: null,
      };
    }

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: "Please provide a max 7 character password",
          },
        ],
        token: null,
        account: null,
      };
    }

    if (!name) {
      return {
        userErrors: [
          {
            message: "Please give a name for purpose",
          },
        ],
        token: null,
        account: null,
      };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // get random url gravatar
        image: gravatar,
      },
    });

    await db.profile.create({
      data: {
        bio: "Tell us about yourself",
        userId: user.id,
      },
    });

    // jwt token
    const token = JWT.sign(
      {
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: 3600000,
      }
    );

    const account = await db.account.create({
      data: {
        providerType: "jwt",
        providerId: "register",
      },
    });

    return {
      userErrors: [],
      token,
      account,
    };
  },

  signin: async (
    _: any,
    { credentials }: SignInArgs,
    { db }: Context
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "There was a problem with your login",
          },
        ],

        token: null,
      };
    }
    // override if password doesnt match in databases
    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message: "There was a problem with your login",
          },
        ],

        token: null,
      };
    }

    const token = JWT.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: 3600000,
    });

    return {
      userErrors: [],
      token,
    };
  },
};
