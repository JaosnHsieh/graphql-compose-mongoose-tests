/**
 * start Apollo Server with graphql-compose-mongoose generated schema
 */
import { ApolloServer } from "apollo-server";
import schema from "./userGqlSchema";
import mongoose from "mongoose";
import { graphql } from "graphql";
import MongoMemoryServer from "mongodb-memory-server";
const mongod = new MongoMemoryServer();

(async () => {
  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();
  //   console.log(uri, port, dbPath, dbName);

  mongoose
    .connect(
      uri,
      { useNewUrlParser: true }
    )
    .then(async () => {
      console.log("DB connected");
      try {
        const mutationStr = `  mutation{
            userCreateOne(record:{firstName:"qq"}){
              recordId
            }}`;
        const mutationResult = await graphql(schema, mutationStr);
        console.log("mutationResult", mutationResult);
        const queryStr = `query($name:String!){
            userOne(filter:{firstName:$name}){
                _id
              }
          }
          `;
        const queryResult = await graphql(
          schema,
          queryStr,
          undefined,
          undefined,
          {
            name: "qq"
          }
        );
        console.log("queryResult", queryResult);
      } catch (err) {
        console.log("graphql query error", err);
      }
    });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log("example1 is a working simple user schema");
    console.log(`🚀  Server ready at ${url}`);
  });
})();
