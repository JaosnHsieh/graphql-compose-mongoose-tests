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
export class AuthorResolver implements ResolverInterface<Author> {
  @Query((returns) => [Author], {
    description: 'Get all the authors ',
  })
  async authors(): Promise<Author[]> {
    const authors = createAuthorSamples();
    console.log(`$ AuthorResolver authors %o`, authors);
    return authors;
  }
  @FieldResolver()
  name(@Root() author: Author): string {
    return author.firstName + author.lastName;
  }
  @FieldResolver()
  posts(@Root() author: Author): Post[] {
    return author.postIds.map((id) =>
      createPostSamples().find((p) => p.id === id),
    );
  }
}
