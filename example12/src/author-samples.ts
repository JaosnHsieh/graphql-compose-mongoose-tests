import { plainToClass } from 'class-transformer';

import { Author } from './author-type';

export function createAuthorSamples() {
  return plainToClass(Author, [
    {
      id: 1,
      firstName: 'author 1 firstname',
      lastName: 'author1 last name',
      postIds: [],
    },
    {
      id: 2,
      firstName: 'author 2 firstname',
      lastName: 'author2 last name',
      postIds: [1, 3],
    },
    {
      id: 3,
      firstName: 'author 3 firstname',
      lastName: 'author3 last name',
      postIds: [],
    },
    {
      id: 4,
      firstName: 'author 4 firstname',
      lastName: 'author4 last name',
      postIds: [2],
    },
  ]);
}
