/**
 * example 10 : how to use graphql-compose-mongoose
 * addRelation
 * after npm start:example10
 * go to http://localhost:4000
 * then copy/paste below Graphql query string to test
 */

/* graphql query string for testing

mutation{
  orderCreateOne(record:{desc:"order1"}){
    record{
      _id
      desc
    }
  }
}

mutation{
  userCreateOne(record:{firstName:"user1",orders:[<yourorderId>]}){
    record{
      _id
      firstName
      orders{
        _id
        desc
      }
    }
  }
}

query{
  userOne{
    orders{
      _id
      desc
    }
  }
}

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
    });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log('example10 is a example using addRelation');
    console.log(`🚀  Server ready at ${url}`);
  });
})();
