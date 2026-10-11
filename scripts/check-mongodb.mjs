import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME || "bazardor";

if (!uri || uri.includes("<USERNAME>") || uri.includes("<PASSWORD>") || uri.includes("<CLUSTER_HOST>")) {
  console.error("MONGODB_URI is missing or still contains the example placeholders. Update .env.local first.");
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

try {
  await client.connect();
  await client.db(databaseName).command({ ping: 1 });
  console.log(`MongoDB connection successful. Database: ${databaseName}`);
} catch (error) {
  console.error("MongoDB connection failed.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.close().catch(() => {});
}
