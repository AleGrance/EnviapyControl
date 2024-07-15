import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient) {}

  getRol<Rol>(path: any): Observable<Rol> {
    return this.http.get<Rol>(this.url + '/' + path, this.options);
  }
}
