import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent,
        pathMatch: 'full'
    },
    {
       path: ':post_id',
       component: PostDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
