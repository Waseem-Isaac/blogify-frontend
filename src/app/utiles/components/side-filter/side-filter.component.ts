import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Category } from '../../models/category';
import { FilterService } from './filter.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  categories$ = this.filterService.categories$;
  categories;
  keyword: string;
  @Output() filterData$ = new EventEmitter<any>();
  @Input() posts = [];

  constructor(private filterService: FilterService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.categories$.pipe(map( res => {
        res.map(category => {
          category['numOfPosts'] = this.posts ? this.posts.filter(post => post['category']['_id'] === category['_id']).length : 0;
        });
        return res;
      })).subscribe(res => this.categories = res);
    }, 1000);
  }

  getPostsPerCategory(categoryId): number {
   return 0;
  }

}
