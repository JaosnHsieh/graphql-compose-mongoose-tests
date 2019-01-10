/**
 * ignore makeExecutableSchema by using
 * schemaComposer.addTypeDefs(typeDefs);
 * schemaComposer.addResolveMethods(resolvers);
 * from: https://github.com/graphql-compose/graphql-compose-mongoose/issues/152#issuecomment-453024774
 */
import { ApolloServer } from "apollo-server";
import schema from "./mix-schema.js";
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
            userCreateOne(record:{firstName:"qqname"}){
              recordId
            }}`;
        const mutationResult = await graphql(schema, mutationStr);
        console.log("mutationResult", mutationResult);
        const queryStr = `query($name:String!){
            userOne(filter:{firstName:$name}){
                _id
              }
            posts{
                id
                title
                votes
            }
          }
          `;
        const queryResult = await graphql(
          schema,
          queryStr,
          undefined,
          undefined,
          {
            name: "qqname"
          }
        );
        console.log("queryResult", JSON.stringify(queryResult, 2, 2));
      } catch (err) {
        console.log("graphql query error", err);
      }
    });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
