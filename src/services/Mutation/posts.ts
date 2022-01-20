import {
  PostPayloadType,
  PostArgs,
  CommentArgs,
  CommentPayloadType,
  LikesPayloadType,
} from "@interface/post";
import { Context } from "@interface/db";
import { getUserPostInfo } from "@utils/getUserInfo";

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { db, userInfo }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to create a post",
          },
        ],
        post: null,
      };
    }

    if (!title || !content) {
      return {
        userErrors: [
          {
            message:
              "You must provide a title and a content to create the post",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await db.post.create({
        data: {
          title,
          content,
          // author id must be dinamic data
          authorId: userInfo.userId,
          published: true,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs["post"] },
    { db, userInfo }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to create a post",
          },
        ],
        post: null,
      };
    }

    // if getUserinfo not found by any credentials
    const error = await getUserPostInfo({
      userId: userInfo.userId,
      postId: +postId,
      db,
    });

    if (error) return error;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Need to have at lease on a field to update",
          },
        ],
        post: null,
      };
    }

    const existingPost = await db.post.findUnique({
      where: {
        id: +postId,
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post doesnt exist",
          },
        ],
        post: null,
      };
    }

    const payloadPostUpdate = {
      title,
      content,
    };

    if (!title) delete payloadPostUpdate.title;
    if (!content) delete payloadPostUpdate.content;

    return {
      userErrors: [],
      post: db.post.update({
        // update the data spread from payloadpost update
        data: {
          ...payloadPostUpdate,
        },

        where: {
          id: +postId,
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { db, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // find post in table id in post
    const post = await db.post.findUnique({
      where: {
        id: +postId,
      },
    });

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to create a post",
          },
        ],
        post: null,
      };
    }

    // if post doesnt exist following by id
    if (!post) {
      return {
        userErrors: [
          {
            message: "Post doesn't exist",
          },
        ],
        post: null,
      };
    }

    // if getUserPostInfo not found by any credentials
    const error = await getUserPostInfo({
      userId: userInfo.userId,
      postId: +postId,
      db,
    });

    if (error) return error;

    await db.post.delete({
      where: {
        id: +postId,
      },
    });

    return {
      userErrors: [],
      post,
    };
  },
  postPublished: async (
    _: any,
    { postId }: { postId: string },
    { db, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to publish and unpublished a post",
          },
        ],
        post: null,
      };
    }

    // if getUserPostInfo not found by any credentials
    const error = await getUserPostInfo({
      userId: userInfo.userId,
      postId: +postId,
      db,
    });

    if (error) return error;

    const postPublished = await db.post.update({
      where: {
        id: +postId,
      },
      data: {
        published: true,
      },
    });

    return {
      userErrors: [],
      post: postPublished,
    };
  },
  postUnPublished: async (
    _: any,
    { postId }: { postId: string },
    { db, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to publish and unpublished a post",
          },
        ],
        post: null,
      };
    }

    // if getUserPostInfo not found by any credentials
    const error = await getUserPostInfo({
      userId: userInfo.userId,
      postId: +postId,
      db,
    });

    if (error) return error;

    const postPublished = await db.post.update({
      where: {
        id: +postId,
      },
      data: {
        published: false,
      },
    });

    return {
      userErrors: [],
      post: postPublished,
    };
  },

  // not already yet
  likesCreate: async (
    _: any,
    { postId }: { postId: string },
    { db, userInfo }: Context
  ): Promise<LikesPayloadType> => {
    // find the post by id from the table and compare with mutation input
    const post = await db.post.findUnique({
      where: {
        id: +postId,
      },
    });

    // not login
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Dont miss up, join with us",
          },
        ],
        likes: null,
      };
    }

    // post is not found
    if (!post) {
      return {
        userErrors: [
          {
            message: "Post is not found",
          },
        ],
        likes: null,
      };
    }

    return {
      userErrors: [],
      likes: await db.likedPost.create({
        data: {
          userId: userInfo.userId,
          postId: +postId,
        },
      }),
    };
  },
  commentCreate: async (
    _: any,
    { comment }: CommentArgs,
    { db, userInfo }: Context
  ): Promise<CommentPayloadType> => {
    // post id didapat dari inputan mutation
    const { postId, text } = comment;

    // user must have auth first
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Login or Signup to comment a post",
          },
        ],
        comment: null,
      };
    }

    // check status post that want to be comment
    const existingPost = await db.post.findUnique({
      where: {
        id: +postId,
      },
    });

    // if not exist in table db
    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post doesnt exist",
          },
        ],
        comment: null,
      };
    }

    if (!text) {
      return {
        userErrors: [
          {
            message: "Please provide the comment",
          },
        ],
        comment: null,
      };
    }

    // if the logic in top was passed return this same with return in schema payload
    return {
      userErrors: [],

      comment: await db.comment.create({
        data: {
          // text dapet dari inputan mutation
          text,
          userId: userInfo.userId,
          // post id dapet dari inputan mutation
          postId,
        },
      }),
    };
  },
};
