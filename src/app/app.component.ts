import { Component, isDevMode, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'EnviapyControlAPP';

  showNavBar = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }

    this.loginService.isLogged.subscribe((result: boolean) => {
      if (result) {
        this.showNavBar = true;
      } else {
        this.showNavBar = false;
      }
    });
  }
}
