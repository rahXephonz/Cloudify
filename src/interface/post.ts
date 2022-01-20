import { Prisma, Post, Comment, LikedPost } from "@prisma/client";

export interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

export interface CommentArgs {
  comment: {
    text?: string;
    postId: number;
  };
}

export interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export interface CommentPayloadType {
  userErrors: {
    message: string;
  }[];
  comment: Comment | Prisma.Prisma__CommentClient<Comment> | null;
}

export interface LikesPayloadType {
  userErrors: {
    message: string;
  }[];
  likes: LikedPost | Prisma.Prisma__LikedPostClient<LikedPost> | null;
}
