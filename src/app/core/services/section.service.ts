import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Section,
  GetSectionsResponse,
  PaginatedPosts,
  GetSectionPostsResponse,
  GetSectionPostsSalient,
} from '../models/section.model';
import { BehaviorSubject } from 'rxjs';
import { Post, mapToPost } from '../models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private sectionSubject = new BehaviorSubject<Section | undefined>(undefined);
  sectionSubscriber$ = this.sectionSubject.asObservable();

  private sectionsSubject = new BehaviorSubject<Section[]>([]);
  sectionsSubscriber$ = this.sectionsSubject.asObservable();

  constructor(private api: ApiService) {}

  updateSectionSubject(section?: Section | string) {
    if (typeof section === 'string') {
      this.sectionsSubscriber$.subscribe((sections) => {
        const sectionFound = sections.find((x) => x.friendlyUrl === section);
        if (!sectionFound) return;
        else this.sectionSubject.next(sectionFound);
      });
    } else this.sectionSubject.next(section);
  }

  updateSectionsSubject(sections: Section[]) {
    this.sectionsSubject.next(sections);
  }

  getSectionPosts(
    name: string,
    page: number,
    quantity = 15
  ): Observable<PaginatedPosts> {
    return this.api.get(`/post/category/${name}/${quantity}/${page}`).pipe(
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

  getSectionSalient(section = 'all'): Observable<Post[]> {
    return this.api.get(`/post/salient/${section}`).pipe(
      map((rawPosts: GetSectionPostsSalient) => {
        return mapToPost(
          rawPosts.data,
          rawPosts.url_attachment,
          section === 'all' ? undefined : section
        );
      })
    );
  }

  getSections(): Observable<Section[]> {
    return this.api.get(`/category/category-list/blog`).pipe(
      map((res: GetSectionsResponse) => {
        return res.listCategories.map((rawSection) => {
          const section: Section = {
            _id: rawSection._id,
            attachmentUrl: res.url_attachment,
            name: rawSection.name,
            friendlyUrl: rawSection.friendly_url,
          };
          return section;
        });
      })
    );
  }

  getSectionPostsPreview(count = 3): Observable<Section[]> {
    return this.api.get(`/category/blog-post/${count}`).pipe(
      map((rawResponse: GetSectionsResponse) => {
        return rawResponse.listCategories.map((rawCategory) => {
          const section: Section = {
            _id: rawCategory._id,
            attachmentUrl: rawResponse.url_attachment,
            name: rawCategory.name,
            friendlyUrl: rawCategory.friendly_url,
            posts: mapToPost(
              rawCategory.postList!,
              rawResponse.url_attachment,
              rawCategory.friendly_url
            ),
          };
          return section;
        });
      })
    );
  }
}
