import { GetSection } from './section.model';

export interface PostDetail {
  type: string;
  value: string;
}

export interface PostAuthor {
  name: string;
}

export interface Post {
  _id?: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  friendlyUrlSection: string;
  friendlyUrl: string;
  urlAttachment?: string;
  imageUrlFeatured?: string;
  related?: Post[];
  details?: PostDetail[];
  author?: PostAuthor;
  createdDate?: string;
  updatedDate?: string;
}

export function mapToPost(
  rawPosts: GetPost[],
  attachmentUrl?: string,
  friendlyUrlSection?: string
) {
  return rawPosts.map((rawPost) => {
    const post: Post = {
      _id: rawPost._id,
      title: rawPost.title,
      subtitle: rawPost.detail,
      imageUrl:
        (attachmentUrl || rawPost.url_attachment) + rawPost.image_banner,
      imageUrlFeatured:
        (attachmentUrl || rawPost.url_attachment) +
        (rawPost.featured ? rawPost.featured_image! : rawPost.image_banner),
      friendlyUrl: rawPost.friendly_url,
      friendlyUrlSection:
        friendlyUrlSection || rawPost.categories[0]?.friendly_url,
      createdDate: rawPost.publication_date,
    };
    return post;
  });
}

export interface GetPost {
  _id: string;
  title: string;
  friendly_url: string;
  categories: GetSection[];
  image_banner: string;
  detail: string;
  create_date: string;
  publication_date: string;
  url_attachment?: string;
  related_post?: GetPost[];
  post_detail?: PostDetail[];
  author?: {
    name: string;
  };
  featured?: boolean;
  featured_image?: string;
}

export type PostListType = 'paginated' | 'aside';
export type PostThreeType = 'column' | 'mosaic' | 'hero';
export type PostHeroType = 'inline' | 'inline-small' | 'stacked';
