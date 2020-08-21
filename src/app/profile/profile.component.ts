import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './services/profile.service';
import { Observable } from 'rxjs';
import { Post } from '../utiles/models/Post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from '../posts/post-form/post-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId = '';
  imgLoaded = false;
  currentUser: any = localStorage.getItem('credentials') || sessionStorage.getItem('credentials') || null;

  user;
  userPosts: Post[] = [];
  constructor(private route: ActivatedRoute, private profileService: ProfileService,
    private modalService: NgbModal, private toastrService: ToastrService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['user_id'];
    this.getUser(this.userId);
    this.getUserPosts(this.userId);
    this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
  }

  getUser(id: string) {
    this.profileService.getUser(id).subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    });
  }

  getUserPosts(id: string) {
    this.profileService.getPostsByUserId(id).subscribe((res: Post[]) => {
      this.userPosts = res;
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
      this.userPosts[index] = res['post'];
    }).catch(() => null);
  }

  deletePost(post, index?) {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'delete';
    modalRef.componentInstance.post = post;
    modalRef.componentInstance.deletePost = true;

    modalRef.result.then(res => {
      this.toastrService.success(res.message , 'Post Deleted Successfully');
      this.userPosts.splice(index, 1);
    }).catch(() => null);

  }
}
