import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseHttpServiceService } from 'src/app/utiles/services/base-http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PostsService } from '../services/posts.service';
import { Category } from 'src/app/utiles/models/category';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/utiles/components/side-filter/filter.service';
import { PusherService } from 'src/app/utiles/services/pusher.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postContent = '';
  categories$ = this.filterService.categories$;
  postCategoryId = this.filterService.categories$.getValue().length && this.filterService.categories$.getValue()[0]._id;

  @Input() formType;
  @Input() post;
  @Input() delete;

  userData: Object;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private toastr: ToastrService, private postsService: PostsService, 
    private filterService: FilterService,
    private pusherService: PusherService
    ) {
    this.userData = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))['userData'] ||
      sessionStorage.getItem('credentials') && JSON.parse(sessionStorage.getItem('credentials'))['userData'] ||
      null;
  }

  ngOnInit() {
    if (this.post) { 
      this.postContent = this.post['content']; 
      this.postCategoryId = this.post['category'] && this.post['category']['_id']; 
    }
  }

  createPost() {
    const body = { 
      content: this.postContent.trim(), 
      user_id: this.userData['_id'] , 
      category_id: this.postCategoryId,
      socketId: this.pusherService.pusher.connection.socket_id
    };

    this.postsService.savePost(body).subscribe(res => {
      res['post']['user'] = this.userData;
      res['post']['category'] = this.categories$.getValue().find(c => c._id === body.category_id);
      this.activeModal.close(res);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }

  editPost() {
    const body = { content: this.postContent.trim(),  category_id: this.postCategoryId };

    this.postsService.editPost(body, this.post._id).subscribe(res => {
      res['post']['user'] = this.userData;
      res['post']['content'] = body.content;
      res['post']['category'] = this.categories$.getValue().find(c => c._id === body.category_id);
      this.activeModal.close(res);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }

  delete_post() {
    this.postsService.deletePost(this.post['_id']).subscribe(res => {
      this.activeModal.close(res);
    }, (err: HttpErrorResponse) => {
      const ErrMsg = err.error.message ? err.error.message : 'API Error : ' + err.statusText;
      this.toastr.error(ErrMsg, 'Error', { disableTimeOut: true });
    });
  }
}
