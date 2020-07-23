import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  apiErrors =  {};

  uploadedImage: string;
  baseUrl = environment.baseUrl;

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
    const user = this.registerForm.value;
    if (this.uploadedImage) {  user['picture'] = this.uploadedImage; }

    this.userService.register(user).pipe(
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

  processFile(imageInput) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      this.userService.uploadImage(file)
      .subscribe(res => {
        this.uploadedImage = res['file']['path'];
      }, err => {
        console.log(err);
      });
    });

    reader.readAsDataURL(file);
  }
}
