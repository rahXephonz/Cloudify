import { Context } from "@interface/db";

interface UserParentType {
  id: number;
}

export const User = {
  posts: async (
    _parent: UserParentType,
    { take, skip }: { take: number; skip: number },
    { db, userInfo }: Context
  ) => {
    // does it same _parent.id 1 === 1 from userInfo context?
    const isOwnProfile = _parent.id === userInfo?.userId;

    if (isOwnProfile) {
      return await db.post.findMany({
        where: {
          authorId: _parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            title: "asc",
          },
        ],
        take,
        skip,
      });
    } else {
      return await db.post.findMany({
        where: {
          authorId: _parent.id,
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            title: "asc",
          },
        ],
        take,
        skip,
      });
    }
  },
  profession: async (_parent: UserParentType, __: any, { db }: Context) => {
    return await db.profession.findMany({
      where: {
        userId: _parent.id,
      },
    });
  },

  // will change to comment

  // likes: async (_parent: UserParentType, __: any, { db }: Context) => {
  //   // return semua data optional but will adding to reference
  //   // const getUserById = await db.user.findUnique({
  //   //   where: {
  //   //     id: _parent.id,
  //   //   },
  //   // });

  //   // thiss will returning from table likes that user including in tables
  //   // atau ada berapa data dengan nama dia di dalam tabel likedpost dengan userId === _parent.id
  //   const getUserLikesById = await db.likedPost.findMany({
  //     where: {
  //       userId: _parent.id,
  //     },
  //   });

  //   return getUserLikesById;
  // },
};
