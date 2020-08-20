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
  comment = '';

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
    this.postsService.addComment(this.postId, this.currentUser['_id'], comment.trim()).subscribe(res => {
      console.log(res);
      this.post.comments.push({content: comment.trim(), user: this.currentUser});
      this.comment = '';
    }, err => console.log(err));
  }

  deleteComment(index: number, commentId: string) {
    this.postsService.deleteComment(this.postId, commentId).subscribe(res => {
      this.post.comments.splice(index, 1);
    }, err => {
      console.log(err);
    });
  }
}
