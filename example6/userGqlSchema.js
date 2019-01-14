import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, index: true },
    lastName: String,
    pasword: String,
  },
  {
    timestamps: true,
  },
).index({ updatedAt: 1, createdAt: 1 });

const OrderSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
const customizationOptions = {};
const UserTC = composeWithMongoose(User);
const OrderTC = composeWithMongoose(Order, customizationOptions);

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userFindMany: UserTC.getResolver('findMany'),
  orderById: OrderTC.getResolver('findById'),
  orderByIds: OrderTC.getResolver('findByIds'),
  orderOne: OrderTC.getResolver('findOne'),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
});

const schema = schemaComposer.buildSchema();

export default schema;
