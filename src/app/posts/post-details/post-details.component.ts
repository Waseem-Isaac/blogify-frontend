import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/utiles/models/Post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postId = '';
  post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.postId = this.route.snapshot.params['post_id'];
   this.getPost(this.postId);
  }

  getPost(id) {
    this.postsService.getPost(id).subscribe((res: Post) => {
      this.post = res;
    }, err => {
      console.log(err);
    });
  }

}
