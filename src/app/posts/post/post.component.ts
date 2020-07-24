import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from 'src/app/utiles/models/Post';

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
    private modalService: NgbModal, private toastrService: ToastrService
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
}
