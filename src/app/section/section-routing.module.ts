import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionComponent } from './section.component';
import { SectionPostComponent } from './section-post/section-post.component';
import { SectionPostListComponent } from './section-post-list/section-post-list.component';

const routes: Routes = [
  {
    path: '',
    component: SectionComponent,
    children: [
      {
        path: '',
        component: SectionPostListComponent,
      },
      {
        path: ':friendlyUrlPost',
        component: SectionPostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
