import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Post, PostListType } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent {
  @Input() type: PostListType;
  @Input() posts: Post[];

  constructor() {}
}
