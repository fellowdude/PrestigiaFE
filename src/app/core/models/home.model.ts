import { Post } from '../models/post.model';
import { Section } from './section.model';

export interface GetHomeResponse {
  postCover: Post;
  postsMostSeen: Post[];
  sections: Section[];
}
