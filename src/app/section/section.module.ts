import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { SectionRoutingModule } from './section-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SectionPostListComponent } from './section-post-list/section-post-list.component';
import { SectionPostComponent } from './section-post/section-post.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SectionComponent,
    SectionPostListComponent,
    SectionPostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LazyLoadImageModule,
    SectionRoutingModule,
  ],
})
export class SectionModule {}
