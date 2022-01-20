import Cors from "micro-cors";
import { typeDefs } from "@graphql/schema";
import {
  Query,
  Mutation,
  Profile,
  Post,
  User,
  Comment,
  LikedPost,
} from "@services/index";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@utils/getUserFromToken";
import { Context } from "@interface/db";

const prisma = new PrismaClient();
const cors = Cors();

export const config: PageConfig = { api: { bodyParser: false } };
export const db = prisma;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
    Comment,
    LikedPost,
  },
  context: async ({ req }: any): Promise<Context> => {
    // get user token and user from jwt bearer token
    const userInfo = getUserFromToken(req.headers.authorization);
    return {
      db,
      userInfo,
    };
  },
  introspection: true,
});

const serverStart = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  // returning
  await serverStart;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
