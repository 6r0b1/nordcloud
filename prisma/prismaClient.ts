import { PrismaClient } from "@prisma/client";

export let prismaClient;

if (process.env.NODE_ENV === "production") {
    prismaClient = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prismaClient = global.prisma;
}
