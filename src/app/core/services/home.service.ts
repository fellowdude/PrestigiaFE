import { Injectable } from '@angular/core';
import { Observable, zip, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GetHomeResponse } from '../models/home.model';
import { SectionService } from './section.service';
import { PostService } from './post.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private api: ApiService,
    private postService: PostService,
    private sectionService: SectionService
  ) {}

  getHome(): Observable<GetHomeResponse> {
    // First obtain the sections populated on page load
    return this.sectionService.sectionsSubscriber$.pipe(
      // Project the result into the returned observable
      mergeMap((sections) => {
        // Form an array of observables with the sections
        const sectionsSalient = sections.map((section, index) =>
          this.sectionService.getSectionSalient(section.friendlyUrl).pipe(
            map((posts) => {
              section.posts = posts;
              // TODO obtain this value from the backend
              section.type = index % 2 === 0 ? 'column' : 'hero'; // temporal
              return section;
            })
          )
        );
        // Zip it with the other route calls (they all execute at the same time)
        return zip(
          this.postService.getPostLast(),
          this.sectionService.getSectionSalient(),
          forkJoin(sectionsSalient) // wait until all sectionsSalient have finished to emit a value for the zip
        ).pipe(
          map(([homeRes, mostSeen, sections]) => ({
            postCover: homeRes,
            postsMostSeen: mostSeen,
            sections: sections,
          }))
        );
      })
    );
  }

  validateDNI(dni: string): Observable<boolean> {
    return this.api.post('/enterprise-middleware/valid-exist-card', {
      numberCard: dni,
    });
  }
}
