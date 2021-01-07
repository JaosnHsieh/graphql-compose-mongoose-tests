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
  author(@Root() postId: number): Author {
    return createAuthorSamples().find(
      (a) => a.id === createPostSamples().find((p) => p.id === postId).authorId,
    );
  }

  @FieldResolver()
  id(@Root() postId: number): number {
    console.log(`$ PostResolver postId ${postId} id @FieldResolver id layer 2`);
    return createPostSamples().find((p) => p.id === postId).id;
  }

  @FieldResolver()
  title(@Root() postId: number): string {
    console.log(
      `$ PostResolver postId ${postId} title @FieldResolver title layer 2`,
    );
    return createPostSamples().find((p) => p.id === postId).title;
  }

  @FieldResolver()
  votes(@Root() postId: number): number {
    console.log(
      `$ PostResolver postId ${postId} votes @FieldResolver votes layer 2`,
    );
    return createPostSamples().find((p) => p.id === postId).votes;
  }
}
