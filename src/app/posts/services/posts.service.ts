import { Injectable } from '@angular/core';
import { BaseHttpServiceService } from 'src/app/utiles/services/base-http.service';
import { Post } from 'src/app/utiles/models/Post';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
    postAdded$: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private baseHttpService: BaseHttpServiceService) { }


    loadAll(query?) {
        return query ? this.baseHttpService.getAll('posts' , query) : this.baseHttpService.getAll('posts');
    }

    savePost(body: Post){
        return this.baseHttpService.post('posts' , body);
    }

    editPost(body: Post, id) {
        return this.baseHttpService.put('posts/' + id , body);
    }

    deletePost(id, socketId) {
        return this.baseHttpService.delete('posts/' + id, {socketId});
    }

    getPost(id) {
        return this.baseHttpService.getById('posts', id);
    }

    like(postId: string, userId: string,socketId: any) {
        return this.baseHttpService.put(`posts/${postId}/like` , {userId: userId, socketId: socketId});
    }

    addComment(postId: string, userId: string, commentContent: string) {
        return this.baseHttpService.post(`comments/${postId}`, {content : commentContent, user_id: userId});
    }

    deleteComment(postId: string, commentId: string) {
        return this.baseHttpService.delete(`comments/${postId}/${commentId}`);
    }
}
