import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user/services/user.service';
import { BaseHttpServiceService } from './utiles/services/base-http.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  }



}
