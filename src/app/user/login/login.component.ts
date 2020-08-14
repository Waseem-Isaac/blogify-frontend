import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/utiles/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  apiErrors = {};

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
    userService.isLoggedIn$.subscribe(res => res && this.router.navigate(['/']) );
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email    : ['' , [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password : ['' , [Validators.required , Validators.minLength(6)]],
      rememberMe: true
    });
  }

  login() {
    this.isLoading = true;
    const loginContext = { email : this.loginForm.value['email'], password: this.loginForm.value['password']};

    return this.userService.login(loginContext).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe((credentials: AuthResponse) => {
     this.userService.setAuthCredentials({token: credentials.token , userData: credentials.userData} , this.loginForm.value['rememberMe']);
      this.loginForm.reset();
      this.apiErrors = {};
      this.userService.isLoggedIn$.next(true);
      this.router.navigate(['/posts']);
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        this.apiErrors['message'] = err.error.message ? err.error.message : 'Something went wrong';
      }

    });
  }
}



export interface AuthResponse {
  message: string;
  token: string;
  userData: User;
}
