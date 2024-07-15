import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { CreateClientResult } from '../common/interfaces/create-client-result';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient) {}

  getCliente<Cliente>(path: any): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + path, this.options);
  }

  postCliente<Cliente>(path: string, body: Cliente): Observable<CreateClientResult> {
    return this.http.post<CreateClientResult>(this.url + '/' + path, body, this.options);
  }

  putCliente(path: string, body: any) {
    return this.http.put(this.url + '/' + path, body, this.options);
  }

  deleteCliente(path: string) {
    return this.http.delete(this.url + '/' + path, this.options);
  }
}
