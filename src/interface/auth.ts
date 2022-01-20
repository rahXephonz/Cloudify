import { Prisma, Account } from "@prisma/client";

export interface SignUpArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

export interface SignInArgs {
  credentials: {
    email: string;
    password: string;
  };
}

export interface UserPayloadType {
  userErrors: {
    message: string;
  }[];
  token: string | null;
  // create a table for accounts in db
  account?: Account | Prisma.Prisma__AccountClient<Account> | null;
}
