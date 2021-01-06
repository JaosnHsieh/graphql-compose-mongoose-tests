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

const { ApolloServer} = require("apollo-server");

(async () => {
  
  const server = new ApolloServer({ schema });

  server.listen(3001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
