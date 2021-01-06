import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Post } from './post-type';
import { Author } from './author-type';
import { createPostSamples } from './post-samples';
import { createAuthorSamples } from './author-samples';

@Resolver((of) => Post)
export class PostResolver {
  @Query((returns) => [Post], { nullable: true })
  async posts(): Promise<Post[] | undefined> {
    return createPostSamples();
  }
  @FieldResolver()
  author(@Root() post: Post): Author {
    return createAuthorSamples().find((a) => a.id === post.authorId);
  }
}
