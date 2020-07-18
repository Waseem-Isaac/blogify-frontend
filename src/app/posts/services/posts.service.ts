import { Injectable } from '@angular/core';
import { BaseHttpServiceService } from 'src/app/utiles/services/base-http.service';
import { Post } from 'src/app/utiles/models/Post';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
    postAdded$: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private baseHttpService: BaseHttpServiceService) { }


    loadAll() {
        return this.baseHttpService.getAll('posts');
    }

    savePost(body: Post){
        return this.baseHttpService.post('posts' , body);
    }

    editPost(body: Post, id) {
        return this.baseHttpService.put('posts/' + id , body);
    }

    deletePost(id) {
        return this.baseHttpService.delete('posts/' + id);
    }
}
