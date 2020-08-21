import { Injectable } from '@angular/core';
import { BaseHttpServiceService } from 'src/app/utiles/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private baseHttpService: BaseHttpServiceService) { }

  getUser(id: string) {
    return this.baseHttpService.getById('users', id);
  }

  getPostsByUserId(id: string) {
    return this.baseHttpService.getById('posts/user', id);
  }
}
