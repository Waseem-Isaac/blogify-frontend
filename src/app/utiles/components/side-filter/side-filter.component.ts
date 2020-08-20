import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { FilterService } from './filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  categories$: Observable<Array<Category>> = this.filterService.getCategories();

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }


}
