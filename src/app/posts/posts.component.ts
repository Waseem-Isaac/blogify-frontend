import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {BaseHttpServiceService} from '../utiles/services/base-http.service';
import { Observable, merge, observable } from 'rxjs';
import { Post } from '../utiles/models/Post';
import { catchError } from 'rxjs/operators';
import { PostsService } from './services/posts.service';
import { UserService } from '../user/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit , AfterViewInit{
  posts: any[];
  query = {};
  @ViewChild('side_filter') side_filter: ElementRef;

  constructor(private postsService: PostsService, private userService: UserService, private router: Router,
    private modalService: NgbModal, private toastrService: ToastrService  
  ) { }

  ngOnInit() {
      this.loadAllPosts(this.query);
  }

  loadAllPosts(query) {
    this.postsService.loadAll(query).subscribe(
      (res: any) => this.posts = res,
      (err) => {
        if (err.status === 401) {
          this.userService.logout().subscribe(() => {
              this.router.navigate(['/user/login'] , { replaceUrl: true});
          });
      }
      }
      );
  }


  filterPosts(keyword: string) {
    this.query['q'] = keyword;
    this.loadAllPosts(this.query);
  }
  ngAfterViewInit() {
    this.postsService.postAdded$.subscribe(res => {
      if (this.posts) {
        this.posts.unshift(res['post']);
      }
    });
  }

  createPost() {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'create';
    modalRef.result.then(res => {
      this.toastrService.success(res['message'] , 'Success');
      this.posts.unshift(res['post']);
    }).catch(() => null);
  }

  editPost(post, index) {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'edit';
    modalRef.componentInstance.post = post;

    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Post Editted Successfully');
      this.posts[index] = res['post'];
    }).catch(() => null);
  }

  deletePost(post, index) {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'delete';
    modalRef.componentInstance.post = post;
    modalRef.componentInstance.deletePost = true;

    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Post Deleted Successfully');
      this.posts.splice(index, 1);
    }).catch(() => null);

  }


  toggleSidefiter(sideToggler: HTMLElement , sideFilter: HTMLElement) {
    sideToggler.classList.toggle('sidebar-toggler-opened')
    sideFilter.classList.toggle('sidebar-lg');
  }
}
