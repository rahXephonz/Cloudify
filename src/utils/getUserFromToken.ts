import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };
  } catch (error) {
    return null;
  }
};
