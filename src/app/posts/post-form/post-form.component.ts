import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseHttpServiceService } from 'src/app/utiles/services/base-http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postContent = '';
  @Input() formType;
  @Input() post;
  @Input() delete;

  userData: Object;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private toastr: ToastrService, private postsService: PostsService) {
    this.userData = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))['userData'] ||
      sessionStorage.getItem('credentials') && JSON.parse(sessionStorage.getItem('credentials'))['userData'] ||
      null;
  }

  ngOnInit() {
    if (this.post) { this.postContent = this.post['content']; }
  }

  createPost() {
    const body = { content: this.postContent.trim(), user_id: this.userData['_id'] };

    this.postsService.savePost(body).subscribe(res => {
      this.activeModal.close(res);
      this.postsService.loadPosts$.next(true);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }

  editPost() {
    const body = { content: this.postContent.trim() };

    this.postsService.editPost(body, this.post._id).subscribe(res => {
      this.activeModal.close(res);
      this.postsService.loadPosts$.next(true);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }

  delete_post() {
    this.postsService.deletePost(this.post['_id']).subscribe(res => {
      this.activeModal.close(res);
      this.postsService.loadPosts$.next(true);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }
}
