import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Post, PostHeroType } from 'src/app/core/models/post.model';
import { ResizeService } from 'src/app/core/services/resize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-hero',
  templateUrl: './post-hero.component.html',
  styleUrls: ['./post-hero.component.scss'],
})
export class PostHeroComponent implements AfterViewInit, OnDestroy {
  private _post: Post;
  @Input() set post(val: Post) {
    this._post = val;
    // Workaround to avoid ngOnChanges
    setTimeout(() => {
      this.fixHeroHeader(window.innerWidth >= 750);
    }, 100);
  }
  get post() {
    return this._post;
  }
  heroHeaderOffsetRatio = -0.06;
  @Input() type: PostHeroType = 'stacked';
  @ViewChild('heroHeader') heroHeader: ElementRef;
  tmpSubscriberResize: Subscription;

  constructor(
    private renderer: Renderer2,
    private resizeService: ResizeService
  ) {}
  ngOnDestroy(): void {
    if (this.tmpSubscriberResize) this.tmpSubscriberResize.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.type === 'stacked') return;
    if (this.type === 'inline-small') this.heroHeaderOffsetRatio = -1;
    // Subscribes to the window resize event service
    // and fixes the header margin-bottom depending on the window width
    this.tmpSubscriberResize = this.resizeService.onResize$.subscribe(
      (event) => {
        this.fixHeroHeader(event.innerWidth >= 750);
      }
    );
  }

  fixHeroHeader(isDesktop = false) {
    if (this.type === 'stacked' || !this.heroHeader) return;
    const marginBottom: number = isDesktop
      ? this.heroHeader.nativeElement.offsetHeight * this.heroHeaderOffsetRatio
      : 0;
    this.renderer.setStyle(
      this.heroHeader.nativeElement,
      'margin-bottom',
      `${marginBottom}px`
    );
  }
}
