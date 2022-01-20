import { Context } from "@interface/db";
import { userLoader } from "@utils/userLoader";

interface PostParentType {
  id: number;
  authorId: number;
}

// this means that every post has a relation to the user
// and the function here will look for the user id with the parent postparenttype whose contents
// authorId because in the post table there is an authorId then we will look for the uniqueness of
// user id === authorid in table post

export const Post = {
  user: async (_parent: PostParentType, __: any, ___: any) => {
    // equal with this : kesimpulan hanya akan merender semua post yang ada idnya dengan author id
    // const getUser = await db.user.findUnique({
    //   where: {
    //     id: _parent.authorId,
    //   },
    // });
    // return getUser;

    return userLoader.load(_parent.authorId);
  },

  likes: async (_parent: PostParentType, __: any, { db }: Context) => {
    const getLikes = await db.likedPost.findMany({
      where: {
        postId: _parent.id,
      },
    });

    return getLikes;
  },

  comments: async (_parent: PostParentType, __: any, { db }: Context) => {
    return await db.comment.findMany({
      where: {
        // logikanya adalah akan mencari user Id yang ada dicomment dengan user id di user
        userId: 1,
      },
    });
  },
};
