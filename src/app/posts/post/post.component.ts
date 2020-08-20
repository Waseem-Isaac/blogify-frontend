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

  constructor(
    private modalService: NgbModal, private toastrService: ToastrService,
    private postsService: PostsService
  ) {
    this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
  }

  ngOnInit() {
    this.numberOfLikes = this.post.likes.length;
    this.post['liked'] = this.post.likes.indexOf(this.currentUser['_id']) > -1;
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
      console.log(res);
      this.numberOfLikes = res['numberOfLikes'];
    }, err => console.log('Error: ', err));
  }
}
