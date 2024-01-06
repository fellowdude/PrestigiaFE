export interface PaginationStream {
  sender: 'PARENT' | 'PAGINATOR' | null;
  pageCurrent?: number;
  pageCount?: number;
}
