import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.userService.isLoggedIn$
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/user/logout'], { replaceUrl: true})
            return false;
          }
          return true;
        })
      );
  }
}
