import { Context } from "@interface/db";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (
    _parent: ProfileParentType,
    __: any,
    { db, userInfo }: Context
  ) => {
    return db.user.findUnique({
      where: {
        id: _parent.userId,
      },
    });
  },
};
