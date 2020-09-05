import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from 'src/app/utiles/models/Post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post;
  @Input() postType;
  @Output() delete = new EventEmitter<Post>();
  @Output() edit = new EventEmitter<Post>();

  imgLoaded = false;
  currentUser = localStorage.getItem('credentials') || sessionStorage.getItem('credentials') || null;
  numberOfLikes: number;
  
  postTime: string;
  constructor(
    private modalService: NgbModal, private toastrService: ToastrService,
    private postsService: PostsService
  ) {
    this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
  }

  ngOnInit() {
    this.numberOfLikes = this.post.likes.length;
    this.post['liked'] = this.post.likes.indexOf(this.currentUser['_id']) > -1;

    this.getPostTime();

    if (this.postTime.indexOf('Minutes') > -1 || this.postTime.indexOf('Now') > -1) {
      setInterval(() => {
        this.getPostTime();
      }, 1000 * 60);
    }
  }

  getPostTime() {
    const date1: any = new Date(this.post['createdAt']);
    const date2: any = new Date();
    const diffTime: any = Math.abs(date2 - date1);
    const difTimeInMins = ((diffTime / 1000) / 60).toFixed();
    const difTimeInHours = ((diffTime / 1000) / 60 / 60).toFixed();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.postTime =
      diffDays < 2 ?
        ( +difTimeInHours > 0 ?
            ( +difTimeInHours < 2 ? difTimeInHours + ' Hour ago' : difTimeInHours + ' Hours ago' ) :
        ( +difTimeInMins < 2 ? 'Now' : difTimeInMins + ' Minutes ago')) :
      diffDays + ' Days ago';
  }

  editPost() {
    this.edit.emit(this.post);
  }

  deletePost() {
   this.delete.emit(this.post);
  }

  toggleLikes(userId) {
    this.postsService.like(this.post._id , userId).subscribe(res => {
      this.post['liked'] = !this.post['liked'];
      this.numberOfLikes = res['numberOfLikes'];
    }, err => console.log('Error: ', err));
  }
}
