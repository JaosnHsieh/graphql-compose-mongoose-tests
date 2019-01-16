/**
 * from https://medium.freecodecamp.org/declarative-graphql-with-graphql-tools-cd1645f94fc
 */
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import {
  schema as authorpostsSchema,
  resolvers as authorPostResolvers,
} from './authorposts';

import {
  schema as myLittleDomainSchema,
  resolvers as myLittleDomainResolvers,
} from './myLittleDomain';

const baseSchema = [
  `
    type Query {
        domain: String
    }
    type Mutation {
        domain: String
    }
    schema {
        query: Query,
        mutation: Mutation
    }`,
];

// Put schema together into one array of schema strings and one map of resolvers, like makeExecutableSchema expects
const schema = [...baseSchema, ...authorpostsSchema, ...myLittleDomainSchema];

const options = {
  typeDefs: schema,
  resolvers: merge(authorPostResolvers, myLittleDomainResolvers),
};

const executableSchema = makeExecutableSchema(options);

export default executableSchema;
