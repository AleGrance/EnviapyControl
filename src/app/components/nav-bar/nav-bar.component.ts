import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  public usuarioLogueado: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogueado = localStorage.getItem('user_name')!;
  }

  logOut() {
    this.authService.logOut();
  }
}
