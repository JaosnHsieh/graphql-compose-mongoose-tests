import { Field, ObjectType, Int } from 'type-graphql';
import { Author } from './author-type';

@ObjectType({ description: 'Object representing post' })
export class Post {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field((_type) => Author)
  author: Author;

  @Field((type) => Int)
  votes: number;
}
