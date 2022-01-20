import { Context } from "@interface/db";

export const userQuery = {
  me: async (_: any, __: any, { db, userInfo }: Context) => {
    if (!userInfo) return null;

    return db.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { db, userInfo }: Context
  ) => {
    const isMyProfile = +userId === userInfo?.userId;

    const profile = await db.profile.findUnique({
      where: {
        userId: +userId,
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      isMyProfile,
    };
  },
};
