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

import { Author } from './author-type';
import { AuthorInput } from './author-input';
// import { createRecipeSamples } from './author-samples';

@Resolver((of) => Author)
export class AuthorResolver implements ResolverInterface<Author> {
  // private readonly items: Recipe[] = createRecipeSamples();
  @Query((returns) => [Author], {
    description: 'Get all the authors ',
  })
  async authors(): Promise<Author[]> {
    return [];
  }
}
