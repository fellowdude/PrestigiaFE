import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostThreeComponent } from './post-three/post-three.component';
import { PostHeroComponent } from './post-hero/post-hero.component';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { LayoutComponent } from './layout/layout.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoaderComponent } from './loader/loader.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchInputComponent } from './header/search-input/search-input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { SanitizeHtmlPipe } from './pipes/sanitizeHtml.pipe';
import { StripHtmlPipe } from './pipes/stripHtml.pipe';
import { ErrorReloadComponent } from './error-reload/error-reload.component';
import { BlocksComponent } from './blocks/blocks.component';
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { BlurFormComponent } from './blur-form/blur-form.component';
import { LogoComponent } from './logo/logo.component';
import { AutofocusDirective } from './directives/autofocus.directive';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PostItemComponent,
    PostThreeComponent,
    PostHeroComponent,
    PostListComponent,
    LayoutComponent,
    TruncatePipe,
    SanitizeHtmlPipe,
    StripHtmlPipe,
    LoaderComponent,
    BreadcrumbComponent,
    SearchInputComponent,
    PaginationComponent,
    ErrorReloadComponent,
    BlocksComponent,
    BlurFormComponent,
    LogoComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PostItemComponent,
    PostThreeComponent,
    PostHeroComponent,
    PostListComponent,
    LayoutComponent,
    LoaderComponent,
    PaginationComponent,
    BreadcrumbComponent,
    TruncatePipe,
    SanitizeHtmlPipe,
    StripHtmlPipe,
    ErrorReloadComponent,
    BlocksComponent,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class SharedModule {}
