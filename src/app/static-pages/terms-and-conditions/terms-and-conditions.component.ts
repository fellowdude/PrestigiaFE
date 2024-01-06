import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticPagesService } from 'src/app/core/services/static-page.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  cptTerms: any;
  loading: boolean = false;
  constructor(
    private staticPagesService: StaticPagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.staticPagesService
        .getPublicStaticPage('terminos_y_condiciones')
        .subscribe((response) => {
          console.log(response);
          this.cptTerms = response;
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
