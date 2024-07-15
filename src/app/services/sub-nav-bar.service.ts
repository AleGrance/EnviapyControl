import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubNavBarService {
  public titulo: string = '';
  public _titulo: BehaviorSubject<string>;

  constructor() {
    this._titulo = new BehaviorSubject<string>('');
  }

  get getTitulo() {
    return this._titulo.asObservable();
  }

  setTitulo(nuevoTitulo: string) {
    this.titulo = nuevoTitulo;
    this._titulo.next(this.titulo);
  }
}
