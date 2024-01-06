import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticPagesService } from 'src/app/core/services/static-page.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss'],
})
export class OurStoryComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  cptStory: any;
  loading: boolean = false;
  constructor(
    private staticPagesService: StaticPagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.staticPagesService
        .getPublicStaticPage('nosotros')
        .subscribe((response) => {
          console.log(response);
          this.cptStory = response;
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
