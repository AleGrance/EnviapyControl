import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { CreateUserResult, Usuario } from '../common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResult } from '../common/interfaces/auth-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient, private router: Router) { }

  logIn<Usuario>(path: string, body: Usuario): Observable<AuthResult> {
    return this.http.post<AuthResult>(this.url + '/' + path, body, this.options);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
  }
}
