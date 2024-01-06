import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '../services/section.service';
import { Section } from '../models/section.model';
import { take, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutResolver implements Resolve<Section[]> {
  constructor(private router: Router, private sectionService: SectionService) {}
  resolve(): Observable<Section[] | any> {
    return this.sectionService.getSections().pipe(
      map((sections) => {
        if (!sections) sections = [];
        this.sectionService.updateSectionsSubject(sections);
        return sections;
      }),
      catchError((_err) =>
        this.router.navigateByUrl('/500', { skipLocationChange: true })
      ),
      take(1)
    );
  }
}
