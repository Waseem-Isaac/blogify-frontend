import { Injectable } from '@angular/core';
import { BaseHttpServiceService } from '../../services/base-http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor(private BaseHttpService: BaseHttpServiceService) {
    if (!this.categories$.getValue() || !this.categories$.getValue().length){
      this.getCategories();
    }
  }

  getCategories() {
     this.BaseHttpService.getAll('categories').subscribe(res => {
      this.categories$.next(res);
    });
  }
}
