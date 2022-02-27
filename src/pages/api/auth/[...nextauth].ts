import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

// initialize
const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  session: {
    jwt: true,
  },

  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  adapter: Adapters.Prisma.Adapter({ prisma }),
  // SQL Database
  database: process.env.DATABASE_URL,
};

export default authHandler;
