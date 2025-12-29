import mongoose, { type Mongoose } from "mongoose";
import { env } from "@pm/env/server";

const DATABASE_URL: string = env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var __mongoose__: MongooseCache | undefined;
}

const globalCache = globalThis as typeof globalThis & {
  __mongoose__?: MongooseCache;
};

const cache: MongooseCache = (globalCache.__mongoose__ ??= {
  conn: null,
  promise: null,
});

export async function closeDbConn(signal: NodeJS.Signals): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log(`MongoDB disconnected (${signal})`);
  }
  process.exit(0);
}

// (["SIGINT", "SIGTERM", "SIGUSR2"] as const).forEach((signal) => {
//   process.on(signal, shutdown);
// });

export async function connectDb(): Promise<Mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(DATABASE_URL, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export * from "./models";
