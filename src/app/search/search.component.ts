import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../core/models/post.model';
import { PostService } from '../core/services/post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Breadcrumb } from '../core/models/breadcrumb.model';
import { PaginationService } from '../core/services/pagination.service';
import { Subscription } from 'rxjs';
import { ErrorReload } from '../core/models/error-reload.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [PaginationService],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchSlug: string | null;
  posts: Post[];
  postsLoaded = false;
  postsError: ErrorReload = {
    status: false,
    reload: undefined,
  };

  breadcrumbs: Breadcrumb[];

  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });
  tmpSubscriberPagination: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private paginationService: PaginationService
  ) {}
  ngOnDestroy(): void {
    this.tmpSubscriberPagination.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.searchSlug = paramMap.get('slug') || '';
      this.searchForm.get('searchValue')?.patchValue(this.searchSlug);
      this.breadcrumbs = [{ name: 'Resultado(s) de la búsqueda' }];
      this.getPosts();
    });

    // Call getPosts every time the paginator sends a new pageCurrent
    this.tmpSubscriberPagination = this.paginationService
      .getPaginationStream$('PAGINATOR')
      .subscribe((event) => {
        this.getPosts(event.pageCurrent);
      });
  }

  getPosts(page = 1) {
    this.postsLoaded = false;
    this.postsError.status = false;
    this.posts = [];
    this.postService.getPosts(this.searchSlug || '', page).subscribe(
      (res) => {
        this.posts = res.posts;
        this.paginationService.updatePaginationStream({
          sender: 'PARENT',
          pageCurrent: page,
          pageCount: res.pageCount || 1,
        });
        this.postsLoaded = true;
      },
      (err) => {
        this.postsError.status = true;
        this.postsError.reload = () => this.getPosts(page);
        console.error(err);
      }
    );
  }
  submitSearch() {
    this.router.navigate([
      '/search',
      this.searchForm.get('searchValue')?.value,
    ]);
  }
}
