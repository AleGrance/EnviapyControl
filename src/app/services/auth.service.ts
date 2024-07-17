import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateUserResult, Usuario } from '../common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResult } from '../common/interfaces/auth-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: BehaviorSubject<boolean>;
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient, private router: Router) {
    this._isAuthenticated = new BehaviorSubject<boolean>(false);
  }

  logIn<Usuario>(path: string, body: Usuario): Observable<AuthResult> {
    return this.http.post<AuthResult>(this.url + '/' + path, body, this.options);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
    this._isAuthenticated.next(false);
  }

  // Auth obser
  get isAuth() {
    return this._isAuthenticated.asObservable();
  }

  setAuth(value: boolean) {
    this._isAuthenticated.next(value)
  }
}
