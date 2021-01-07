import {
  Resolver,
  Query,
  ResolverInterface,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Post } from './post-type';
import { createPostSamples } from './post-samples';
import { createAuthorSamples } from './author-samples';
import { Author } from './author-type';

@Resolver((of) => Author)
export class AuthorResolver {
  @Query((returns) => [Author], {
    description: 'Get all the authors ',
  })
  async authors(): Promise<Author[]> {
    const authors = createAuthorSamples();
    return authors;
  }
  @FieldResolver()
  name(@Root() author: Author): string {
    return author.firstName + author.lastName;
  }

  @FieldResolver()
  posts(@Root() author: Author): number[] {
    console.log(
      `$ AuthorResolver author.id ${author.id} posts @FieldResolver layer 1`,
    );
    return author.postIds;
  }
}
