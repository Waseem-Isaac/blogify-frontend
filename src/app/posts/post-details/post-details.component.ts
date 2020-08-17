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
  currentUser = localStorage.getItem('credentials') || sessionStorage.getItem('credentials') || null;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
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


  addComment(comment: string) {
    
    this.postsService.comment(this.postId, this.currentUser['_id'], comment.trim()).subscribe(res => {
      console.log(res);
      this.post.comments.push({content: comment.trim(), user: this.currentUser});
    }, err => console.log(err));
  }
}
