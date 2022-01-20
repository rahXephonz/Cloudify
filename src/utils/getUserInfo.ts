import { Context } from "@interface/db";

// for get post info
interface GetUserPostInfo {
  userId: number;
  postId: number;
  db: Context["db"];
}

// for get profession info
interface GetUserProfessionInfo {
  userId: number;
  professionId: number;
  db: Context["db"];
}

// for get profile info

interface GetUserProfileInfo {
  userId: number;
  profileId: number;
  db: Context["db"];
}

export const getUserPostInfo = async ({
  userId,
  postId,
  db,
}: GetUserPostInfo) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null,
    };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.authorId !== user.id) {
    return {
      userErrors: [
        {
          message: "Post is not owned by user",
        },
      ],
      post: null,
    };
  }
};

export const getUserProfessionProfile = async ({
  userId,
  professionId,
  db,
}: GetUserProfessionInfo) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      profession: null,
    };
  }

  const profession = await db.profession.findUnique({
    where: {
      id: professionId,
    },
  });

  if (profession?.userId !== user.id) {
    return {
      userErrors: [
        {
          message: "Profession is not owned by user",
        },
      ],
      profession: null,
    };
  }
};

export const getUserProfileInfo = async ({
  userId,
  profileId,
  db,
}: GetUserProfileInfo) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      profile: null,
    };
  }

  const profile = await db.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  if (profile?.userId !== user.id) {
    return {
      userErrors: [
        {
          message: "Bio is not owned by user",
        },
      ],
      profile: null,
    };
  }
};
