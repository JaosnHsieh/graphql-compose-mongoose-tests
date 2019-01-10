/**
 * print schema and type from GraphQLObjectType according to
 * 1. https://github.com/graphql-compose/graphql-compose-mongoose#can-i-get-generated-vanilla-graphql-types
 * 2. https://github.com/apollographql/graphql-tools/issues/398#issue-256044531
 * 3. https://github.com/graphql/graphql-js/issues/1464#issuecomment-412506816
 */
import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import { graphql, printSchema, printType } from "graphql";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    pasword: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);
const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

schemaComposer.Query.addFields({
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne")
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver("createOne"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne")
});

const schema = schemaComposer.buildSchema();

console.log("-----printSchema(schema)-----", printSchema(schema));
console.log(
  "-----printType(UserTC.getType())-----",
  printType(UserTC.getType())
);
