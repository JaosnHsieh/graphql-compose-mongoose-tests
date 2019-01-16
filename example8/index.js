/**
 * from https://medium.freecodecamp.org/declarative-graphql-with-graphql-tools-cd1645f94fc
 */

import { ApolloServer } from 'apollo-server';
import { default as graphqlSchema } from './schema';

(async () => {
  try {
    const server = new ApolloServer({ schema: graphqlSchema });

    server.listen().then(({ url }) => {
      console.log(
        'example8 is a display how to use relations on graphqlSchema',
      );
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
