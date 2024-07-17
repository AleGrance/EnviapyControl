import { Component, isDevMode, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public token: string = '';

  title = 'EnviapyControlAPP';

  public showNavBar: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }

    this.checkAuth();
  }

  checkAuth() {
    this.token = localStorage.getItem('token')!;

    // Suscribe al obs isAuth que cambia de estado al hacer clic en el btn logout
    this.authService.isAuth.subscribe((result: boolean) => {
      if (result) {
        this.showNavBar = true;
      } else {
        this.showNavBar = false;
      }
    });

    // Checkear el token al recargar la pagina
    if (this.token) {
      this.showNavBar = true;
    } else {
      this.showNavBar = false;
    }
  }
}
