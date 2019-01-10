import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

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
export default schema;
