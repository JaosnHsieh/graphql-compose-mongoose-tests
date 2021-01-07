import { plainToClass } from 'class-transformer';

import { Post } from './post-type';

export function createPostSamples() {
  return plainToClass(Post, [
    {
      id: 1,
      title: 'post 1 title',
      votes: 1,
      authorId: 2,
    },
    {
      id: 2,
      title: 'post 2 title',
      votes: 99,
      authorId: 4,
    },
    {
      id: 3,
      title: 'post 3 title',
      votes: 199,
      authorId: 2,
    },
  ]);
}
