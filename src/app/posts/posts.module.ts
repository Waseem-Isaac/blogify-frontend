import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { UtilesModule } from '../utiles/utiles.module';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UtilesModule,
    FormsModule,
    PostsRoutingModule
  ],
  declarations: [PostsComponent, PostComponent, PostDetailsComponent],
})
export class PostsModule { }
