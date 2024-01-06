import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StaticPagesModule } from './static-pages/static-pages.module';
@NgModule({
  declarations: [AppComponent, InternalErrorComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    StaticPagesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
