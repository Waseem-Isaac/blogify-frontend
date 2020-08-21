import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/utiles/models/Post';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from '../post-form/post-form.component';

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

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router,
    private modalService: NgbModal, private toastrService: ToastrService) { }

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


  editPost(post, index?) {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'edit';
    modalRef.componentInstance.post = post;

    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Post Editted Successfully');
      this.post = res['post'];
    }).catch(() => null);
  }

  deletePost(post, index?) {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'delete';
    modalRef.componentInstance.post = post;
    modalRef.componentInstance.deletePost = true;

    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Post Deleted Successfully');
      this.router.navigate(['/posts'], {replaceUrl: true});
    }).catch(() => null);

  }
}
