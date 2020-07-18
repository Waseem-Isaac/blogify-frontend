import { Injectable } from '@angular/core';
import { User } from '../../utiles/models/user';
import { BaseHttpServiceService } from '../../utiles/services/base-http.service';
import { BehaviorSubject, of, Observable } from 'rxjs';

const authCredentialsKey = 'credentials';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _authCredentails: {token, userData};
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private baseHttpService: BaseHttpServiceService) {
    const savedAuthCredentials = sessionStorage.getItem(authCredentialsKey) || localStorage.getItem(authCredentialsKey);
    if (savedAuthCredentials) {
      this._authCredentails = JSON.parse(savedAuthCredentials);
      this.isLoggedIn$.next(true);
    }
  }

  register(newUser: User) {
    return this.baseHttpService.post('users', newUser);
  }

  login(loginContext: {email, password}) {
   return this.baseHttpService.post('auth', loginContext);
  }

  logout (): Observable<boolean> {
    this.setAuthCredentials();
    this.isLoggedIn$.next(false);
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this._authCredentails;
  }

  get authCredentials(): {token, userData} | null {
    return this._authCredentails;
  }

  setAuthCredentials(authCredentials?: {token, userData}, remember?: boolean) {
    this._authCredentails = authCredentials || null;

    if (authCredentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(authCredentialsKey , JSON.stringify(authCredentials));
    } else {
      sessionStorage.removeItem(authCredentialsKey);
      localStorage.removeItem(authCredentialsKey);
    }

  }
}
