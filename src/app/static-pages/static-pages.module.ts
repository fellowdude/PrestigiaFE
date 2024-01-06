import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsBookComponent } from './complaints-book/complaints-book.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PoliticsAndPrivacyComponent } from './politics-and-privacy/politics-and-privacy.component';
const staticPagesRoutes: Routes = [
  { path: '', redirectTo: 'complaints-book', pathMatch: 'full' },
  { path: 'complaints-book', component: ComplaintsBookComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'our-story', component: OurStoryComponent },
  { path: 'politcs-and-privacy', component: PoliticsAndPrivacyComponent },
];

@NgModule({
  declarations: [
    ComplaintsBookComponent,
    TermsAndConditionsComponent,
    OurStoryComponent,
    PoliticsAndPrivacyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(staticPagesRoutes),
  ],
})
export class StaticPagesModule {}
