import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from 'src/app/posts/post-form/post-form.component';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/posts/services/posts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , AfterViewInit {
  user = localStorage.getItem('credentials') || null;
  imageLoaded = false;
  baseUrl = environment.baseUrl;

  constructor(private userService: UserService, private router: Router,
      private modalService: NgbModal, private toastrService: ToastrService,
      private postsService: PostsService
      ) { }

  ngOnInit() {
    this.user = this.user && JSON.parse(this.user).userData;
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/user/login'] , { replaceUrl: true});
    });
  }

  openPostFormCMPT() {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'create';
    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Success');
      this.postsService.postAdded$.next(res);
    }).catch(() => null);
  }

  ngAfterViewInit() {
  }
}
