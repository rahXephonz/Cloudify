import { Context } from "@interface/db";

export const postQuery = {
  hello: () => "wew!",
  posts: async (
    _: any,
    { take, skip }: { take: number; skip: number },
    { db }: Context
  ) => {
    const posts = await db.post.findMany({
      where: {
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
      skip,
      take,
    });

    return posts;
  },
  // public
  comments: async (_: any, __: any, { db }: Context) => {
    return await db.comment.findMany();
  },
};
