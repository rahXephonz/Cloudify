import {
  ProfessionArgs,
  ProfessionPayloadType,
  ProfileArgs,
  ProfilePayloadType,
} from "@interface/user";
import { Context } from "@interface/db";
import {
  getUserProfessionProfile,
  getUserProfileInfo,
} from "@utils/getUserInfo";

export const userResolvers = {
  professionCreate: async (
    _: any,
    { profession }: ProfessionArgs,
    { db, userInfo }: Context
  ): Promise<ProfessionPayloadType> => {
    const { role } = profession;

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profession: null,
      };
    }

    if (!role) {
      return {
        userErrors: [
          {
            message: "Please provide what you are?",
          },
        ],
        profession: null,
      };
    }

    return {
      userErrors: [],
      profession: await db.profession.create({
        data: {
          role,
          // get from token userinfo
          userId: userInfo.userId,
        },
      }),
    };
  },

  professionDelete: async (
    _: any,
    { professionId }: { professionId: string },
    { db, userInfo }: Context
  ): Promise<ProfessionPayloadType> => {
    const profession = await db.profession.findUnique({
      where: {
        id: +professionId,
      },
    });

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profession: null,
      };
    }

    // if role profession doesnt exist following by id
    if (!profession) {
      return {
        userErrors: [
          {
            message: "Role doesn't exist",
          },
        ],
        profession: null,
      };
    }

    const error = await getUserProfessionProfile({
      userId: userInfo.userId,
      professionId: +professionId,
      db,
    });

    if (error) return error;

    await db.profession.delete({
      where: {
        id: +professionId,
      },
    });

    return {
      userErrors: [
        {
          message: "Profession Deleted",
        },
      ],
      profession,
    };
  },

  profileCreate: async (
    _: any,
    { profile }: ProfileArgs,
    { db, userInfo }: Context
  ): Promise<ProfilePayloadType> => {
    const { bio } = profile;

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profile: null,
      };
    }
    if (!bio) {
      return {
        userErrors: [
          {
            message: "Please describe about yourself?",
          },
        ],
        profile: null,
      };
    }

    return {
      userErrors: [],
      profile: await db.profile.create({
        data: {
          bio,
          // get from token userinfo
          userId: userInfo.userId,
        },
      }),
    };
  },

  profileUpdate: async (
    _: any,
    {
      profile,
      profileId,
    }: { profileId: string; profile: ProfileArgs["profile"] },
    { db, userInfo }: Context
  ): Promise<ProfilePayloadType> => {
    const { bio } = profile;

    const existingBio = await db.profile.findUnique({
      where: {
        id: +profileId,
      },
    });

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profile: null,
      };
    }

    if (!existingBio) {
      return {
        userErrors: [
          {
            message: "Bio doesnt exist",
          },
        ],
        profile: null,
      };
    }

    // if getUserinfo not found by any credentials
    const error = await getUserProfileInfo({
      userId: userInfo.userId,
      profileId: +profileId,
      db,
    });

    if (error) return error;

    if (!bio) {
      return {
        userErrors: [
          {
            message: "Please describe about your self? and dont leave it blank",
          },
        ],
        profile: null,
      };
    }

    const payloadProfileUpdate = {
      bio,
    };

    return {
      userErrors: [],
      profile: db.profile.update({
        data: {
          ...payloadProfileUpdate,
        },

        where: {
          id: +profileId,
        },
      }),
    };
  },
};
