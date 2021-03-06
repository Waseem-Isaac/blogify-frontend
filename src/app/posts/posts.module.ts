import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { UtilesModule } from '../utiles/utiles.module';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';


@NgModule({
  declarations: [PostsComponent, PostComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    UtilesModule,
    FormsModule,
    PostsRoutingModule
  ],
  exports: [PostComponent]
})
export class PostsModule { }
