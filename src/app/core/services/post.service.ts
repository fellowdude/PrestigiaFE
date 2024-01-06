import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, GetPost, mapToPost } from '../models/post.model';
import { ApiService } from './api.service';
import {
  PaginatedPosts,
  GetSectionPostsResponse,
} from '../models/section.model';
import { SectionService } from './section.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private relatedPostSubject = new BehaviorSubject<Post[]>([]);
  relatedPostSubscriber$ = this.relatedPostSubject.asObservable();

  constructor(
    private api: ApiService,
    private sectionService: SectionService
  ) {}

  updateRelatedPostSubject(posts: Post[]) {
    this.relatedPostSubject.next(posts);
  }

  getPost(friendlyUrlPost: string): Observable<Post> {
    return this.api.get(`/post/detail/${friendlyUrlPost}`).pipe(
      map((rawPost: GetPost) => {
        const post: Post = {
          _id: rawPost._id,
          friendlyUrl: rawPost.friendly_url,
          imageUrl: rawPost.url_attachment + rawPost.image_banner,
          urlAttachment: rawPost.url_attachment,
          createdDate: rawPost.publication_date,
          title: rawPost.title,
          subtitle: rawPost.detail,
          details: rawPost.post_detail,
          related: mapToPost(
            rawPost.related_post || [],
            rawPost.url_attachment,
            rawPost.categories[0]?.friendly_url
          ),
          friendlyUrlSection: rawPost.categories[0]?.friendly_url,
          author: rawPost.author,
        };
        return post;
      })
    );
  }

  getPostLast(): Observable<Post> {
    // Home cover
    return zip(
      this.api.get(`/post/last-post`) as Observable<GetPost[]>,
      this.sectionService.sectionsSubscriber$
    ).pipe(
      map(([rawPosts, sections]) => {
        if (rawPosts.length === 0)
          throw Error('Failed to fetch the last post.');
        const rawPost = rawPosts[0];
        // TODO change this in the backend, it should return attachmentUrl by default
        const section = sections.find(
          (section) => section._id === rawPost.categories[0]?._id
        );
        const post: Post = {
          _id: rawPost._id,
          friendlyUrl: rawPost.friendly_url,
          friendlyUrlSection: rawPost.categories[0]?.friendly_url,
          imageUrl: section?.attachmentUrl + rawPost.image_banner,
          subtitle: rawPost.detail,
          createdDate: rawPost.create_date,
          title: rawPost.title,
        };
        return post;
      })
    );
  }

  getPosts(
    searchValue: string,
    page: number,
    quantity = 10
  ): Observable<PaginatedPosts> {
    const params = this.api.createHttpParams({
      search: {
        filter: [{ field: 'title', type: 'text', value: searchValue }],
        mode: 'allField',
      },
      page,
      quantity,
    });
    return this.api.get(`/post/search-post`, params).pipe(
      map((rawSectionPosts: GetSectionPostsResponse) => {
        const paginatedPosts: PaginatedPosts = {
          pageCount: rawSectionPosts.quantityPage,
          posts: mapToPost(
            rawSectionPosts.data,
            rawSectionPosts.url_attachment,
            undefined
          ),
        };
        return paginatedPosts;
      })
    );
  }
}
