/// <reference types="node" />
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend globalThis for Prisma
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// Explicitly type process.env
const NODE_ENV: string = process.env.NODE_ENV || "development";
const DATABASE_URL: string = process.env.DATABASE_URL || "";

// Use existing instance or create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Store instance globally in development
if (NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
