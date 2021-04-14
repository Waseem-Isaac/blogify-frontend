import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from 'src/app/utiles/models/Post';
import { PostsService } from '../services/posts.service';
import { PusherService } from 'src/app/utiles/services/pusher.service';

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
  diffDays: number;
  difTimeInHours: any;
  postTimeInterval;
  constructor(
    private modalService: NgbModal, private toastrService: ToastrService,
    private postsService: PostsService, private pusherService: PusherService
  ) {
    this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
  }

  ngOnInit() {

    this.pusherService.channel.bind('likeAdded', data => {
      if(this.post._id === data.postId) {
        this.numberOfLikes =  data.numberOfLikes;
      }
    });

    this.numberOfLikes = this.post.likes.length;
    this.post['liked'] = this.post.likes.indexOf(this.currentUser['_id']) > -1;

    this.getPostTime();

    if (this.postTime.indexOf('Minutes') > -1 || this.postTime.indexOf('Now') > -1) {
       this.postTimeInterval = setInterval(() => {
        this.getPostTime();
      }, 1000 * 60);
    }
  }

  getPostTime() {
    const postDate: any = new Date(this.post['createdAt']);
    const currentDate: any = new Date();
    const diffTime: any = Math.abs(postDate - currentDate);
    const difTimeInMins = ((diffTime / 1000) / 60).toFixed();
    this.difTimeInHours = ((diffTime / 1000) / 60 / 60).toFixed();
    this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.postTime =
      +this.diffDays < 2 ?
        ( +difTimeInMins > 59 ?
            ( +this.difTimeInHours < 2 ? this.difTimeInHours + ' Hour ago' : this.difTimeInHours + ' Hours ago' ) :
        ( +difTimeInMins < 2 ? 'Now' : difTimeInMins + ' Minutes ago')) :
      (  this.diffDays + ' Days ago');

    if (+difTimeInMins > 59) { clearInterval(this.postTimeInterval); }
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
