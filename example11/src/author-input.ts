import { Author } from './author-type';
import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthorInput implements Partial<Author> {
  @Field()
  id: string;
}
