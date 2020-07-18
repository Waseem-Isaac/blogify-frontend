import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post;
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
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'edit';
    modalRef.componentInstance.post = this.post;

    modalRef.result.then(res => {
      console.log(res);
      this.toastrService.success(res.message , 'Post Editted Successfully');
    }).catch(() => null);
  }

  deletePost() {
    const modalRef = this.modalService.open(PostFormComponent, { centered: true , windowClass: 'post-form-modal'});
    modalRef.componentInstance.formType = 'delete';
    modalRef.componentInstance.post = this.post;
    modalRef.componentInstance.deletePost = true;

    modalRef.result.then(res => {
      console.log(res);
      this.toastrService.success(res.message , 'Post Deleted Successfully');
    }).catch(() => null);
  }
}
