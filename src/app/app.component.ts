import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user/services/user.service';
import { BaseHttpServiceService } from './utiles/services/base-http.service';
import { first, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isLoggedIn$;
  httpError$ = this.baseHttpService.httpError$;

  constructor(private userService: UserService, private baseHttpService: BaseHttpServiceService, private router: Router) {

  }
  title = 'frontend-app';

  ngOnInit() {

    const onNavigationEnd =  this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    onNavigationEnd.subscribe((route: NavigationEnd) => {
      if (route.urlAfterRedirects.indexOf('/user/') > -1) {
        document.querySelector('.pages-content').classList.add('pl-0');
      } else {
        document.querySelector('.pages-content').classList.remove('pl-0');
      }
    });
  }

}