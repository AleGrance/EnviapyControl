import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Contador } from '../common';
import { CreateCounterResult } from '../common/interfaces/create-counter-result';


@Injectable({
  providedIn: 'root',
})
export class ContadorService {
  private url: string = environment.url;
  private options = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + accessToken,
      apikey: environment.apiKey,
    },
  };

  constructor(private http: HttpClient) {}

  getContador<Contador>(path: any): Observable<Contador> {
    return this.http.get<Contador>(this.url + '/' + path, this.options);
  }

  postContador<Contador>(path: string, body: Contador): Observable<CreateCounterResult> {
    return this.http.post<CreateCounterResult>(this.url + '/' + path, body, this.options);
  }

  patchContador<Contador>(path: string, body: Contador): Observable<CreateCounterResult> {
    return this.http.patch<CreateCounterResult>(this.url + '/' + path, body, this.options);
  }

  deleteContador(path: string) {
    return this.http.delete(this.url + '/' + path, this.options);
  }
}
