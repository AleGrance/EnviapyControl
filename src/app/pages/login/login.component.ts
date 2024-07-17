import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResult } from '../../common/interfaces/auth-result';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public token: string = '';

  public usuario = {
    user_name: '',
    user_password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkUserToken();
  }

  checkUserToken() {
    this.token = localStorage.getItem('token')!;

    // Habilitar el navbar si hay un token en el localstorage
    if (this.token) {
      this.router.navigate(['/contadores']);
    }
  }

  logIn() {
    this.authService.logIn('auth', this.usuario).subscribe({
      next: (result: AuthResult) => {
        const { token, user_fullname, user_id, role_id, auth } = result;
        // console.log(result);

        localStorage.setItem('token', token);
        localStorage.setItem('user_name', user_fullname);
        // localStorage.setItem('role_id', role_id);

        if (auth) {
          this.toastr.success('Acceso correcto', 'Enviapy Alert');
          this.authService.setAuth(true);
          this.router.navigate(['/contadores']);
        } else {
        }
      },
      error: (error: AuthResult) => {
        this.toastr.warning(error.error?.message, 'Enviapy Alert');
      },
    });
  }
}
