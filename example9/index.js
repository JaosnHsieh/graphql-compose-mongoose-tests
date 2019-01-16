/**
 * this example 9 is not really related to graphql-compose-mongoose
 * it demonstrates how to use nested resolver with mongoose
 * the key points is in the file ./models Line 148 and Line 154
 *
 * references:
 * mongoose populate
 * https://stackoverflow.com/a/34986438/6414615
 *
 * graphql
 * https://stackoverflow.com/questions/41416005/handling-mongoose-populated-fields-in-graphql
 * https://github.com/apollographql/graphql-tools
 *
 */

import { ApolloServer } from 'apollo-server';
import { graphql } from 'graphql';
import { initMongo, graphqlSchema } from './models';

(async () => {
  try {
    await initMongo();
    try {
      const mutationStr = `  mutation{
        createPerson(name:"${Math.random()}-jasonqq}"){
          _id
          name
        }
      }`;
      const mutationResult = await graphql(graphqlSchema, mutationStr);
      console.log('mutationResult', JSON.stringify(mutationResult, 2, 2));
      const queryStr = `query{
        people{
          _id
          name
          age
          stories{
            _id
            title
          }
        }
        stories{
          _id
          title
          _creator{
            _id
            name
          }
          fans{
            _id
            name
          }
        }
      }`;
      const queryResult = await graphql(
        graphqlSchema,
        queryStr,
        undefined,
        undefined,
      );
      console.log('queryResult', JSON.stringify(queryResult, 2, 2));
    } catch (err) {
      console.log('graphql query error', err);
    }

    const server = new ApolloServer({ schema: graphqlSchema });

    server.listen().then(({ url }) => {
      console.log(`this example 9 demonstrate how to use nested resolver with mongoose
      * the key points is in the file ./models Line 148 and Line 154`);
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
