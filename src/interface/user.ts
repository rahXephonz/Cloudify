import { Prisma, Profession, Profile } from "@prisma/client";

// user have profession like developer
export interface ProfessionArgs {
  profession: {
    role?: string;
  };
}

export interface ProfileArgs {
  profile: {
    bio?: string;
  };
}

export interface ProfessionPayloadType {
  userErrors: {
    message: string;
  }[];
  profession: Profession | Prisma.Prisma__ProfessionClient<Profession> | null;
}

export interface ProfilePayloadType {
  userErrors: {
    message: string;
  }[];
  profile: Profile | Prisma.Prisma__ProfileClient<Profile> | null;
}
