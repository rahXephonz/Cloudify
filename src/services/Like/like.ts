import { Context } from "@interface/db";

interface LikedPostParentType {
  userId: number;
}

export const LikedPost = {
  user: async (_parent: LikedPostParentType, __: any, { db }: Context) => {
    return db.user.findUnique({
      where: {
        id: _parent.userId,
      },
    });
  },
};
