/**
 * Schema Stitching Example with example1 Apollo server
 * from: https://blog.hasura.io/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072
 * run in sequencely
 * 1. npm run start:example1
 * 2. npm run start:example4
 * 3. go to http://localhost:3001
 * test with below graphql query string
  ```
  mutation{
  userCreateOne(record:{firstName:"qq"}){
    recordId
  }
}
query{
  userOne{
    _id
    firstName
  }
}
 ```
 */
console.log(`* run in sequencely
* npm run start:example1
* npm run start:example4
*/`);
import schema from "./graphql-tool-schema";
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const { ApolloServer, gql } = require("apollo-server");

(async () => {
  const introspectionResult = await introspectSchema(
    new HttpLink({ uri: "http://localhost:4000", fetch })
  );

  const schema2 = await makeRemoteExecutableSchema({
    schema: introspectionResult,
    link: new HttpLink({ uri: "http://localhost:4000", fetch })
  });

  const schema3 = mergeSchemas({ schemas: [schema, schema2] });
  const server = new ApolloServer({ schema: schema3 });

  server.listen(3001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
