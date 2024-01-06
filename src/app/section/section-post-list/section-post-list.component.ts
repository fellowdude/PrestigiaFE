import { Component, OnInit, OnDestroy } from '@angular/core';
import { SectionService } from 'src/app/core/services/section.service';
import { Post } from 'src/app/core/models/post.model';
import { ErrorReload } from 'src/app/core/models/error-reload.model';
import { Section } from 'src/app/core/models/section.model';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/core/services/pagination.service';
@Component({
  selector: 'app-section-post-list',
  templateUrl: './section-post-list.component.html',
  styleUrls: ['./section-post-list.component.scss'],
  providers: [PaginationService],
})
export class SectionPostListComponent implements OnInit, OnDestroy {
  section: Section;
  posts: Post[];
  postHero: Post;
  postHeroLoaded = false;

  postsLoaded = false;
  postsError: ErrorReload = {
    status: false,
    reload: undefined,
  };
  sectionMore: Post[];
  tmpSubscriberSection: Subscription;
  tmpSubscriberPagination: Subscription;

  constructor(
    private paginationService: PaginationService,
    private sectionService: SectionService
  ) {}
  ngOnDestroy(): void {
    this.tmpSubscriberSection.unsubscribe();
    this.tmpSubscriberPagination.unsubscribe();
  }

  ngOnInit(): void {
    this.tmpSubscriberSection = this.sectionService.sectionSubscriber$.subscribe(
      (section) => {
        if (!section) return;
        this.postsLoaded = false;
        this.section = section;
        this.sectionMore = [];
        this.getSectionPosts(1, true);
      }
    );

    // Call getSectionPosts every time the paginator sends a new pageCurrent
    this.tmpSubscriberPagination = this.paginationService
      .getPaginationStream$('PAGINATOR')
      .subscribe((event) => {
        this.getSectionPosts(event.pageCurrent);
      });
  }

  getSectionPosts(page = 1, populateSectionMore = false) {
    window.scroll(0, 0);
    this.postsLoaded = false;
    if (populateSectionMore) {
      this.postHeroLoaded = false;
    }
    this.postsError.status = false;
    this.posts = [];
    this.sectionService
      .getSectionPosts(this.section.friendlyUrl, page)
      .subscribe(
        (res) => {
          this.posts = res.posts;
          if (page === 1 && this.posts.length > 0) {
            this.postHeroLoaded = true;
            this.postHero = this.posts.splice(0, 1)[0];
          }

          this.sectionService
          .getSectionPosts(this.section.friendlyUrl, page+1)
          .subscribe(
            (res) => {

              this.sectionMore = res.posts.length > 3 ? res.posts.slice(0, 3) : this.posts.slice(0, 3);
            }, (err)=>{
              console.error(err);
              this.sectionMore = this.posts.slice(0, 3);
            })

          // Update the paginator with the new values
          this.paginationService.updatePaginationStream({
            sender: 'PARENT',
            pageCurrent: page,
            pageCount: res.pageCount || 1,
          });

          this.postsLoaded = true;
        },
        (err) => {
          this.postsError.status = true;
          this.postsError.reload = () => this.getSectionPosts(page);
          console.error(err);
        }
      );
  }
}
