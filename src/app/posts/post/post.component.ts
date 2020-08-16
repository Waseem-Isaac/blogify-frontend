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
  @Output() delete = new EventEmitter<Post>();
  @Output() edit = new EventEmitter<Post>();

  imgLoaded = false;
  currentUser = localStorage.getItem('credentials') || null;

  constructor(
    private modalService: NgbModal, private toastrService: ToastrService,
    private postsService: PostsService
  ) {
    this.currentUser = this.currentUser && JSON.parse(this.currentUser).userData;
  }

  ngOnInit() {
  }


  editPost() {
    this.edit.emit(this.post);
  }

  deletePost() {
   this.delete.emit(this.post);
  }

  toggleLikes(userId) {
    const index = this.post.likes.indexOf(userId);
    index > -1 ? this.post.likes.splice(index , 1) : this.post.likes.push(userId);
    
    // this.postsService.editPost({content: this.post['content'] , likes: this.post.likes}, this.post._id).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // })
  }
}
