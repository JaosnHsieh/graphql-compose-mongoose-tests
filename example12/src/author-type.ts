import { Field, ObjectType, Int, Float } from 'type-graphql';
import { Post } from './post-type';
@ObjectType({ description: 'Object representing cooking recipe' })
export class Author {
  @Field()
  id: number;

  @Field({
    nullable: true,
    description: 'first name desc',
  })
  firstName: string;

  @Field({
    nullable: true,
    description: 'last name desc',
  })
  lastName: string;

  @Field({
    nullable: true,
    description: 'name',
  })
  name: string;

  @Field((_type) => [Post])
  posts: Post[];

  postIds?: number[];
}
