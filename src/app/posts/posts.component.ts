import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class PostsComponent implements OnInit {
  posts: any[];
  loadPosts$ = this.postsService.loadPosts$;
  @ViewChild('side_filter') side_filter: ElementRef;

  constructor(private postsService: PostsService, private userService: UserService, private router: Router,
    private modalService: NgbModal, private toastrService: ToastrService  
  ) { }

  ngOnInit() {
    this.loadPosts$.subscribe(res => {
      this.loadAllPosts();
    });
  }

  loadAllPosts() {
    this.postsService.loadAll().subscribe(
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

  createPost() {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'create';
    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Success');
    }).catch(() => null);
  }

  toggleSidefiter() {
    // if (this.side_filter.nativeElement.classList.contains('sidebar-lg')) {
    //   this.side_filter.nativeElement.querySelector('.side-filter-container').style.display = 'none';
    //   this.side_filter.nativeElement.classList.remove('sidebar-lg');
    //   this.side_filter.nativeElement.classList.add('sidebar-sm');
    // } else {
    //   this.side_filter.nativeElement.classList.add('sidebar-lg');
    //   this.side_filter.nativeElement.classList.remove('sidebar-sm');

    //   this.side_filter.nativeElement.querySelector('.side-filter-container').style.display = 'block';
    //   this.side_filter.nativeElement.querySelector('.side-filter-container').style.padding = '20px';
    // }
  }
}
