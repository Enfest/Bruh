import { PrismaClient } from "@prisma/client";

export type TContext = {
    prisma: PrismaClient;
};
