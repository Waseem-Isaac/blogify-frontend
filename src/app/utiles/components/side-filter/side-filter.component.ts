import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { FilterService } from './filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  categories$ = this.filterService.categories$;
  keyword: string;
  @Output() filterData$ = new EventEmitter<any>();

  constructor(private filterService: FilterService) {
   }

  ngOnInit() {
  }

}
