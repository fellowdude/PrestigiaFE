import { Post, GetPost, PostThreeType } from './post.model';

export interface Section {
  _id?: string;
  name: string;
  subtitle?: string;
  createdDate?: string;
  updatedDate?: string;
  friendlyUrl: string;
  attachmentUrl?: string;
  type?: PostThreeType;
  invert?: boolean;
  posts?: Post[];
}

export interface PaginatedPosts {
  pageCount: number;
  posts: Post[];
}

export interface GetSection {
  friendly_url: string;
  name: string;
  _id: string;
  postList?: GetPost[];
}

export interface GetSectionsResponse {
  url_attachment: string;
  listCategories: GetSection[];
}

export interface GetSectionPostsResponse {
  url_attachment: string;
  totalItem: number;
  quantityPage: number;
  data: GetPost[];
}

export interface GetSectionPostsSalient {
  url_attachment: string;
  data: GetPost[];
}
