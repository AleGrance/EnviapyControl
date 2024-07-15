import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public _logged: BehaviorSubject<boolean>;

  constructor() {
    this._logged = new BehaviorSubject<boolean>(false);
  }

  get isLogged() {
    return this._logged.asObservable();
  }

  setLogged(value: boolean) {
    this._logged.next(value);
  }
}
