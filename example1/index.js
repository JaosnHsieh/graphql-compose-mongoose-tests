import { ApolloServer } from "apollo-server";
import schema from "./userGqlSchema";
import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
const mongod = new MongoMemoryServer();

(async () => {
  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();
  console.log(uri, port, dbPath, dbName);

  mongoose
    .connect(
      uri,
      { useNewUrlParser: true }
    )
    .then(() => console.log("DB connected"));

  const server = new ApolloServer(schema);

  server.listen().then(({ url }) => {
    console.log("example1 is a working simple user schema");
    console.log(`🚀  Server ready at ${url}`);
  });
})();
