import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// After some point, during app usage,
// I received the error Already 10 Prisma Clients are actively running and also a Address already in use.

// The production check is done because in development, npm run dev clears the Node.js cache at runtime,
// and this causes a new PrismaClient initialization each time due to hot reloading, so we’d not solve the problem.

// @references:
// https://flaviocopes.com/nextjs-fix-prismaclient-unable-run-browser/
// https://github.com/kentcdodds/remix-tutorial-walkthrough/blob/main/app/utils/db.server.ts
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

declare global {
  /* eslint-disable no-var */
  /* eslint-disable no-unused-vars */
  var __prisma: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }

  prisma = global.__prisma;
}

export { prisma };
