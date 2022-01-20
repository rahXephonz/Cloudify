import { User } from "@prisma/client";
import Dataloader from "dataloader";
import { db } from "src/pages/api/graphql";

type BatchUser = (ids: number[]) => Promise<User[]>;

// this function is for reduce action callback from query that we querying from client
// it will stored on memory and cached it when called again

const batchUsers: BatchUser = async (ids) => {
  // found the id
  console.log(ids);

  const users = await db.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

// @ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);
