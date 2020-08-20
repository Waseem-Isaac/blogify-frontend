import { Injectable } from '@angular/core';
import { BaseHttpServiceService } from '../../services/base-http.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private BaseHttpService: BaseHttpServiceService) { }

  getCategories(): Observable<Array<Category>> {
    return this.BaseHttpService.getAll('categories');
  }
}
