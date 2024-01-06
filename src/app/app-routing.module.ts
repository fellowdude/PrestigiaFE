import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutResolver } from './core/resolvers/layout.resolver';
import { LayoutComponent } from './shared/layout/layout.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SectionResolver } from './core/resolvers/section.resolver';

export let routes: Routes = [
  {
    path: '500',
    component: InternalErrorComponent,
  },
  {
    // Always keep last
    path: '',
    component: LayoutComponent,
    resolve: {
      sections: LayoutResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      { path: '404', component: PageNotFoundComponent },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./static-pages/static-pages.module').then(
            (m) => m.StaticPagesModule
          ),
        data: { preload: false },
      },
      {
        path: ':friendlyUrlSection',
        resolve: { section: SectionResolver },
        loadChildren: () =>
          import('./section/section.module').then((m) => m.SectionModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
