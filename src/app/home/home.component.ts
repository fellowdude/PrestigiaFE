import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../core/services/home.service';
import { Post, PostThreeType } from '../core/models/post.model';
import { Section } from '../core/models/section.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PaginationService } from '../core/services/pagination.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorReload } from '../core/models/error-reload.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PaginationService],
})
export class HomeComponent implements OnInit, OnDestroy {
  postCover: Post;
  postsMostSeen: Post[];
  sections: Section[];
  postThreeType: PostThreeType = 'mosaic';

  homeLoaded = false;
  homeError: ErrorReload = {
    status: false,
    reload: undefined,
  };

  postMostSeenIndex = 0;
  postMostSeenIndex$: Observable<number>;

  swiperConfig: SwiperConfigInterface;

  constructor(
    private homeService: HomeService,
    private paginationService: PaginationService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getHome();
    this.postMostSeenIndex$ = this.paginationService
      .getPaginationStream$('PAGINATOR')
      .pipe(map((x) => (x.pageCurrent || 1) - 1));
  }

  getHome() {
    this.homeLoaded = false;
    this.homeError.status = false;
    this.homeService.getHome().subscribe(
      (res) => {
        this.postCover = res.postCover;
        if (res.postsMostSeen.length > 0) {
          res.postsMostSeen[0].imageUrl = res.postsMostSeen[0].imageUrlFeatured!;
        }
        this.postsMostSeen = res.postsMostSeen.slice(0, 3);
        this.sections = this.populateSectionInvert(res.sections);
        this.initSwiper(this.postsMostSeen.length > 1 ? 2 : 1);
        this.homeLoaded = true;
      },
      (err) => {
        this.homeError.status = true;
        this.homeError.reload = () => this.getHome();
        console.log(err);
      }
    );
  }

  populateSectionInvert(sections: Section[]) {
    let sectionInvertTracker: any = {};
    if (sections.length > 6) sections = sections.slice(0, 6);
    sections.forEach((section) => {
      // Oscilate between true|false
      sectionInvertTracker[section.type!] = !sectionInvertTracker[
        section.type!
      ];
      // in this case we want to start with false so the opposite is used
      section.invert = !sectionInvertTracker[section.type!];
    });
    return sections;
  }

  initSwiper(slidesPerView: number) {
    this.swiperConfig = {
      a11y: true,
      direction: 'horizontal',
      slidesPerView: 1,
      keyboard: false,
      mousewheel: false,
      scrollbar: false,
      navigation: false,
      pagination: false,
      breakpoints: {
        // when window width is >= 1281px
        750: {
          slidesPerView,
          spaceBetween: 24, //1.5rem
        },
      },
      autoplay: {
        delay: 10000,
      },
    };
    this.paginationService.updatePaginationStream({
      sender: 'PARENT',
      pageCurrent: 1,
      pageCount: this.postsMostSeen.length,
    });
  }

  postMostSeenIndexChanged(index: number) {
    this.paginationService.updatePaginationStream({
      sender: 'PARENT',
      pageCurrent: index + 1,
      pageCount: this.postsMostSeen.length,
    });
  }
}
