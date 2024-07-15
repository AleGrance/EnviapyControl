import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContadoresComponent } from './pages/contadores/contadores.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contadores',
    component: ContadoresComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [authGuard],
  },
];
