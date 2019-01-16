import { myLittleTypes } from './datasource';

const rootResolvers = {
  Query: {
    myLittleType: (_, { id }) => myLittleTypes.find(t => t.id === id),
  },
};

export default rootResolvers;
