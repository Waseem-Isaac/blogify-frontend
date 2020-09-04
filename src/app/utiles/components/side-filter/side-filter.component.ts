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
  categories = [];
  loading = true;
  keyword: string;
  @Output() filterData$ = new EventEmitter<any>();
  @Input() posts = [];

  constructor(private filterService: FilterService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.categories$.subscribe(res => { this.loading = false; this.categories = res; } );
    }, 1000);
  }

}
