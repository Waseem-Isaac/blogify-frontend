import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  apiErrors =  {};

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name     : ['' , Validators.required],
      email    : ['' , [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password : ['' , [Validators.required , Validators.minLength(6)]]
    });
  }

  register() {
    this.isLoading = true;
    this.userService.register(this.registerForm.value).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {
      this.registerForm.reset();
      this.apiErrors = {};
      this.router.navigate(['/user/login'] , {replaceUrl: true});
    }, (err) => {
      if (err['error']['message'].indexOf('duplicate') >= 0) {
        this.apiErrors['message'] = 'Email is already registred';
      } else {
        this.apiErrors['message'] = err['error']['message'].replace(/\,/g,  ' \n ' );
      }
    });
  }
}
