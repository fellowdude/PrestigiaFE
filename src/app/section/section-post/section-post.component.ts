import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-post',
  templateUrl: './section-post.component.html',
  styleUrls: ['./section-post.component.scss'],
})
export class SectionPostComponent implements OnInit, OnDestroy {
  post: Post;
  postLoaded = false;
  postNotFound = false;

  postsRelated: Post[];
  showPostsRelated = false;

  tmpSubscriber: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.postLoaded = false;
      this.postNotFound = false;
      const friendlyUrlPost = paramMap.get('friendlyUrlPost')!;
      this.postService.getPost(friendlyUrlPost).subscribe(
        (post) => {
          this.post = post;
          this.postsRelated = post.related!;
          this.postLoaded = true;
        },
        (err) => {
          this.postNotFound = true;
          console.log(err);
        }
      );
    });
  }
}
