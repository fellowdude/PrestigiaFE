import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticPagesService } from 'src/app/core/services/static-page.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-politics-and-privacy',
  templateUrl: './politics-and-privacy.component.html',
  styleUrls: ['./politics-and-privacy.component.scss'],
})
export class PoliticsAndPrivacyComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  cptPolitic: any;
  loading: boolean = false;
  constructor(
    private staticPagesService: StaticPagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.staticPagesService
        .getPublicStaticPage('politicas_y_privacidad')
        .subscribe((response) => {
          console.log(response);
          this.cptPolitic = response;
        })
    );
  }
  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  sanitizeHtml(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
