import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { BaseHttpServiceService } from './services/base-http.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private baseHttpService: BaseHttpServiceService, private toastr: ToastrService, private userService: UserService , 
        private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('authorization' , this._jwt);

        const authReq = req.clone({ headers });
        return next.handle(authReq);
    }

    get _jwt(): string {
        const authCredentials = localStorage.getItem('credentials') || sessionStorage.getItem('credentials');
        let token;

        if (authCredentials) {
           token = JSON.parse(authCredentials).token;
        }
        return 'Bearer ' + token;
    }

}
