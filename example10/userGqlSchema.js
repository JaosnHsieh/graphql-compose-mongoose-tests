import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const OrderSchema = new mongoose.Schema({
  desc: String,
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);
const OrderTC = composeWithMongoose(Order, customizationOptions);

UserTC.addRelation('orders', {
  resolver: () => OrderTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: user => user.orders,
  },
  projection: { orders: 1 },
});
schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  orderById: OrderTC.getResolver('findById'),
  orderByIds: OrderTC.getResolver('findByIds'),
  orderOne: OrderTC.getResolver('findOne'),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  orderCreateOne: OrderTC.getResolver('createOne'),
  orderUpdateById: OrderTC.getResolver('updateById'),
  orderUpdateOne: OrderTC.getResolver('updateOne'),
});

const schema = schemaComposer.buildSchema();
export default schema;
