import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { CreateUserResult } from '../common';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient) {}

  getUsuario<Usuario>(path: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + '/' + path, this.options);
  }

  postUsuario<Usuario>(path: string, body: Usuario): Observable<CreateUserResult> {
    return this.http.post<CreateUserResult>(
      this.url + '/' + path,
      body,
      this.options
    );
  }

  patchUsuario<Usuario>(path: string, body: Usuario): Observable<CreateUserResult> {
    return this.http.patch<CreateUserResult>(this.url + '/' + path, body, this.options);
  }

  deleteUsuario(path: string) {
    return this.http.delete(this.url + '/' + path, this.options);
  }
}
