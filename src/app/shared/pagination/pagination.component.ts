import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  pageCurrent = 1;
  pageCount = 1;
  paginationPages = [1];
  paginationShowDotsLeft = false;
  paginationShowDotsRight = false;
  @Input() paginationOffset = 2;
  tmpSubscriber: Subscription;

  constructor(private paginationService: PaginationService) {}
  ngOnDestroy(): void {
    this.tmpSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    // Call the function every time the parent sends new data
    this.tmpSubscriber = this.paginationService
      .getPaginationStream$('PARENT')
      .subscribe((event) => {
        this.pageCount = event.pageCount || 1;
        this.pageCurrent = event.pageCurrent || 1;
        this.updatePaginator();
      });
  }

  setPageTo(index: number) {
    if (index > 0 && index < this.pageCount + 1) {
      this.pageCurrent = index;
      this.paginationService.updatePaginationStream({
        sender: 'PAGINATOR',
        pageCurrent: this.pageCurrent,
      });
    }
  }

  updatePaginator() {
    if (!this.pageCurrent) this.pageCurrent = 1;
    if (!this.pageCount) this.pageCount = 1;
    // TODO refactor this into something... better
    let tempPaginationPages = [];
    for (
      let i = this.pageCurrent - 1;
      i > 0 && i > this.pageCurrent - this.paginationOffset - 1;
      i--
    ) {
      tempPaginationPages.unshift(i);
    }
    tempPaginationPages.push(this.pageCurrent);
    for (
      let i = this.pageCurrent + 1;
      i <= this.pageCount && i < this.pageCurrent + this.paginationOffset + 1;
      i++
    ) {
      tempPaginationPages.push(i);
    }
    this.paginationShowDotsLeft = tempPaginationPages[0] === 1 ? true : false;
    this.paginationShowDotsRight =
      tempPaginationPages[tempPaginationPages.length - 1] === this.pageCount
        ? true
        : false;
    this.paginationPages = tempPaginationPages;
  }
}
