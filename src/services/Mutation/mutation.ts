import { authResolvers } from "./auth";
import { postResolvers } from "./posts";
import { userResolvers } from "./users";

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
  ...userResolvers,
};
