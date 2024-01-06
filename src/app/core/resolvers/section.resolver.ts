import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '../services/section.service';
import { take, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SectionResolver implements Resolve<any> {
  constructor(private router: Router, private sectionService: SectionService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const urlPathSection = route.paramMap.get('friendlyUrlSection')!;
    return this.sectionService.sectionsSubscriber$.pipe(
      map((sections) => {
        const section = sections.find((x) => x.friendlyUrl === urlPathSection);
        if (section) {
          this.sectionService.updateSectionSubject(section);
          return;
        } else throw Error();
      }),
      catchError((_err) => this.router.navigateByUrl('/404')),
      take(1)
    );
  }
}
