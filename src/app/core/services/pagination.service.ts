import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationStream } from '../models/paginator.model';
import { filter } from 'rxjs/operators';

// Inject it manually into the parent component
// @Component({
//   selector: ...,
//   template: ...,
//   providers: [PaginationService]
// })
@Injectable()
export class PaginationService {
  private paginationStream = new BehaviorSubject<PaginationStream>({
    sender: null,
  });
  paginationStream$ = this.paginationStream.asObservable();
  updatePaginationStream(val: PaginationStream) {
    this.paginationStream.next(val);
  }

  getPaginationStream$(sender: PaginationStream['sender']) {
    return this.paginationStream$.pipe(filter((x) => x.sender === sender));
  }
}
