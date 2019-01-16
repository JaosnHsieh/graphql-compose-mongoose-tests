/**
 * mongoose populate
 * https://stackoverflow.com/a/34986438/6414615
 *
 * graphql
 * https://stackoverflow.com/questions/41416005/handling-mongoose-populated-fields-in-graphql
 * https://github.com/apollographql/graphql-tools
 *
 */
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
//https://github.com/apollographql/apollo-server/issues/1633#issuecomment-436586978
import MongoMemoryServer from 'mongodb-memory-server';

import { makeExecutableSchema } from 'graphql-tools';

mongoose.set('debug', true);
const Schema = mongoose.Schema;
const personSchema = Schema({
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

export const Story = mongoose.model('Story', storySchema);
export const Person = mongoose.model('Person', personSchema);

const addDataToMongo = async () => {
  const person1 = await Person.create({
    name: `person1`,
    age: 30,
    stories: [],
  });

  const story1 = await Story.create({
    _creator: person1._id,
    title: 'story1',
    fans: [],
  });

  const person2 = await Person.create({
    name: `person2`,
    age: 30,
    stories: [story1._id],
  });
  const person3 = await Person.create({
    name: `person3`,
    age: 30,
    stories: [story1._id],
  });
  const story2 = await Story.create({
    _creator: person2._id,
    title: 'story2',
    fans: [person2._id, person3._id],
  });
  return;
};
const queryAndPrintMongodbData = async () => {
  const people = await Person.find({}).populate('stories');
  const stories = await Story.find({})
    .populate('_creator')
    .populate('fans');
  console.log('--people--', JSON.stringify(people, 2, 2));
  console.log('--stories--', JSON.stringify(stories, 2, 2));
};
export const initMongo = () =>
  new Promise(async resolve => {
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();
    // console.log(uri, port, dbPath, dbName);

    mongoose
      .connect(
        uri,
        { useNewUrlParser: true },
      )
      .then(async () => {
        console.log('DB connected');
        await addDataToMongo();
        await queryAndPrintMongodbData();
        resolve();
      })
      .catch(err => {
        console.log(err);
      });
  });

const typeDefs = `
type Person{
  _id: String!
  name: String
  age: Int
  stories: [Story]
}
type Story{
  _id: String!
  _creator: Person
  title: String
  fans: [Person]  
}

# the schema allows the following query:
type Query {
  people: [Person]
  stories: [Story]
}

type Mutation{
  createPerson(name:String!, age:Int, stories:[String]): Person
  createStory(_creator:String, title:String!, fans:[String]): Story
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}

`;

const resolvers = {
  Query: {
    async people() {
      const people = await Person.find({});
      // const people = await Person.find({}).populate('stories');
      // console.log('people', people);
      return people;
    },
    async stories() {
      return await Story.find({})
        .populate('_creator')
        .populate('fans');
    },
  },
  // this is key point of this example 9
  Person: {
    stories: async person => {
      return await Story.find({ _id: { $in: person.stories } });
    },
  },
  // this is key point of this example 9
  Story: {
    _creator: async story => {
      return await Person.findById(story._creator);
    },
    fans: async story => {
      return await Person.find({ _id: { $in: story.fans } });
    },
  },
  Mutation: {
    createPerson: async (_, { name, age, stories }) => {
      return await Person.create({ name, age, stories });
    },
    createStory: async (_, { _creator, title, fans }) => {
      return await Story.create({ _creator, title, fans });
    },
  },
};
export const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
