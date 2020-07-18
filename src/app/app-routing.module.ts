import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './user/guards/auth.guard';

const routes: Routes = [
  {
    path: '' , redirectTo: 'posts' , pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'posts',
    loadChildren: './posts/posts.module#PostsModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'posts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
