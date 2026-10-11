import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri || uri.includes("<USERNAME>") || uri.includes("<PASSWORD>") || uri.includes("<CLUSTER_HOST>")) {
  throw new Error("MONGODB_URI is missing or still contains example placeholders. Update .env.local with your MongoDB Atlas connection string.");
}

const options = {};

const globalForMongo = globalThis;
const client =
  process.env.NODE_ENV === "development"
    ? globalForMongo._mongoClient || new MongoClient(uri, options)
    : new MongoClient(uri, options);

if (process.env.NODE_ENV === "development") {
  globalForMongo._mongoClient = client;
}

export const db = client.db(process.env.MONGODB_DB_NAME || "bazardor");
export { client };
