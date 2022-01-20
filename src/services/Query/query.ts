import { postQuery } from "./post";
import { userQuery } from "./user";

export const Query = {
  ...postQuery,
  ...userQuery,
};
