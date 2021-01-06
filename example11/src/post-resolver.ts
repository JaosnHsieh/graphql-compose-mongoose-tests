import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Float,
  Int,
  ResolverInterface,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { Post } from './post-type';
// import { Po } from './post-input';
// import { createRecipeSamples } from './recipe-samples';

@Resolver((of) => Post)
export class PostResolver implements ResolverInterface<Post> {
  // private readonly items: Recipe[] = createRecipeSamples();

  @Query((returns) => [Post], { nullable: true })
  async posts(): Promise<Post[] | undefined> {
    return [];
  }
}
