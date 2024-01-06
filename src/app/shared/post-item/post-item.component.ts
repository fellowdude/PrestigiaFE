import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  // TODO inputs this into a config
  @Input() showImage = false;
  @Input() showSubtitle = false;
  @Input() showDate = false;
  @Input() showReadMore = false;
  @Input() textAlignReadMore: 'left' | 'center' | 'right' = 'left';
  @Input() subtitleTruncate = 280;
  @Input() post: Post;
  @Input() inSwiper = false;
  constructor() { }
}
