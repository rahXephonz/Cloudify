import { Context } from "@interface/db";

export const Comment = {
  // not implement yet
  user: async (_parent: any, __: any, { db }: Context) => {
    return await db.user.findUnique({
      where: {
        id: 2,
      },
    });
  },
};
