import schema from "./graphql-tool-schema";
const { ApolloServer, gql } = require("apollo-server");

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
