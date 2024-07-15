import { Component, ElementRef, OnInit } from '@angular/core';
import { ResponseStatus, Usuario } from '../../common';
import { SubNavBarService, UsuarioService } from '../../services';
import { SubNavBarComponent } from '../../components';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';
import { Rol } from '../../common/interfaces/rol';
import { RolService } from '../../services/rol.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [SubNavBarComponent, FormsModule, NgSelectModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public roles: Rol[] = [];

  // Usuario nuevo
  public usuarioNuevo: Usuario = {
    user_name: '',
    user_fullname: '',
    user_email: '',
    user_password: '',
    role_id: 1,
  };

  // Modificar usuario
  public usuarioModificadoId = 0;
  public usuarioModificado: Usuario = {
    user_name: '',
    user_fullname: '',
    user_email: '',
    user_password: '',
    role_id: 1,
  };

  constructor(
    private apiUsuario: UsuarioService,
    private apiRol: RolService,
    private subnavbar: SubNavBarService,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subnavbar.setTitulo('Usuarios');
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.apiRol.getRol<Rol[]>('roles').subscribe((result) => {
      this.roles = result;
    });
  }

  obtenerUsuarios() {
    this.apiUsuario.getUsuario<Usuario[]>('users').subscribe((result) => {
      console.log('usuarios', result);
      this.usuarios = result;
    });
  }

  openModal() {
    console.log('open modal');

    const modalElement = this.el.nativeElement.querySelector('#usuarioModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  crearUsuario() {
    // console.log(this.usuarioNuevo);

    this.apiUsuario
      .postUsuario<Usuario>('users', this.usuarioNuevo)
      .subscribe((result) => {
        // console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success('Usuario creado correctamente', 'Enviapy Alert');
          this.obtenerUsuarios();
          this.usuarioNuevo = {
            user_name: '',
            user_fullname: '',
            user_email: '',
            user_password: '',
            role_id: 1,
          };
        } else {
          this.toastr.error(
            'Error al intentar registrar el usuario',
            'Enviapy Alert'
          );
        }
      });
  }

  modificarUsuario(usuario: Usuario) {
    console.log('usuario a modificar', usuario);
    this.usuarioModificadoId = usuario.user_id!;

    this.usuarioModificado = {
      user_name: usuario.user_name,
      user_fullname: usuario.user_fullname,
      user_email: usuario.user_email,
      user_password: usuario.user_password,
      role_id: usuario.role_id,
    };
  }

  guardarCambios() {
    console.log(this.usuarioModificado);
    this.apiUsuario
      .patchUsuario('users/' + this.usuarioModificadoId, this.usuarioModificado)
      .subscribe((result) => {
        // console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success(
            'Usuario modificado correctamente',
            'Enviapy Alert'
          );
          this.obtenerUsuarios();
          this.usuarioNuevo = {
            user_name: '',
            user_fullname: '',
            user_email: '',
            user_password: '',
            role_id: 1,
          };
        } else {
          this.toastr.error(
            'Error al intentar registrar el usuario',
            'Enviapy Alert'
          );
        }
      });
  }
}
