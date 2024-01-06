import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Post, PostThreeType } from 'src/app/core/models/post.model';
@Component({
  selector: 'app-post-three',
  templateUrl: './post-three.component.html',
  styleUrls: ['./post-three.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostThreeComponent {
  @Input() type: PostThreeType;
  @Input() posts: Post[];
  @Input() invert: boolean;

  constructor() {}
}
