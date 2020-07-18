import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { UtilesModule } from '../utiles/utiles.module';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    UtilesModule,
    PostsRoutingModule
  ],
  declarations: [PostsComponent, PostComponent],
})
export class PostsModule { }
