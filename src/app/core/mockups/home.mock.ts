import { mockPosts, mockPost } from './post.mock';
import { GetHomeResponse } from '../models/home.model';

export const mockGetHome: GetHomeResponse = {
  postCover: mockPost,
  postsMostSeen: mockPosts,
  //sections: mockSectionsPosts,
};
