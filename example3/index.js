/**
 * print type from GraphQLObjectType according to
 * 1. https://github.com/graphql-compose/graphql-compose-mongoose#can-i-get-generated-vanilla-graphql-types
 * 2. https://github.com/apollographql/graphql-tools/issues/398#issue-256044531
 */
import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import { graphql, printType } from "graphql";

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

console.log(printType(UserTC.getType()));
