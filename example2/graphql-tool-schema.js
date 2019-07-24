import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  interface Human{
    id: Int!
    name: String!
  }
  type Man implements Human{
    id: Int!
    name: String!
    isBold: Boolean!
  }

  type Woman implements Human{
    id: Int!
    name: String!
    isCute: Boolean!
  }


  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    people: [Human]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

const resolvers = {
  Human: {
    __resolveType: ({ gender }) => (gender === 0 ? 'Man' : 'Woman'),
  },
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id: id }),
    people: () => {
      return [
        {
          id: 123,
          name: `bold man`,
          isBold: true,
          gender: 0,
        },
        {
          id: 456,
          name: `cute woman`,
          isCute: true,
          gender: 1,
        },
      ];
    },
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (...args) => {
      console.log('...args', ...args);
      const author = args[0];
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
};

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Apollo', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
