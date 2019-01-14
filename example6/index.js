/**
 * start Apollo Server with graphql-compose-mongoose generated schema
 * If add index on mongoose schema, then can use them filter, sort ...
 */
import { ApolloServer } from 'apollo-server';
import schema from './userGqlSchema';
import mongoose from 'mongoose';
import { graphql } from 'graphql';
import MongoMemoryServer from 'mongodb-memory-server';
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
      { useNewUrlParser: true },
    )
    .then(async () => {
      console.log('DB connected');
      try {
        const mutationStr = `  mutation{
            userCreateOne(record:{firstName:"qq"}){
              recordId
            }}`;
        const mutationResult = await graphql(schema, mutationStr);
        console.log('mutationResult', mutationResult);
        const queryStr = `query {
          userOne(
            filter: { _operators: { updatedAt: { gte: "2019-01-14T10:19:46.301Z" } } }
          ) {
            _id
            lastName
            firstName
            updatedAt
          }
        }
        
          `;
        const queryResult = await graphql(
          schema,
          queryStr,
          undefined,
          undefined,
        );
        console.log('queryResult', queryResult);
      } catch (err) {
        console.log('graphql query error', err);
      }
    });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log('example1 is a working simple user schema');
    console.log(`🚀  Server ready at ${url}`);
  });
})();
