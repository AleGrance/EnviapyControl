import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubNavBarService } from '../../services/sub-nav-bar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private subNavService: SubNavBarService, private authService: AuthService) {}

  logOut() {
    this.authService.logOut();
  }

}
