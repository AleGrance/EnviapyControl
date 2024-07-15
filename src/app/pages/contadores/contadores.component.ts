import { Component, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Cliente, Contador, ResponseStatus, Usuario } from '../../common';
import {
  ClienteService,
  ContadorService,
  SubNavBarService,
  UsuarioService,
} from '../../services';
import { SubNavBarComponent } from '../../components';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-contadores',
  standalone: true,
  imports: [DatePipe, SubNavBarComponent, FormsModule, NgSelectModule],
  templateUrl: './contadores.component.html',
  styleUrl: './contadores.component.scss',
})
export class ContadoresComponent implements OnInit {
  public contadores: Contador[] = [];
  public clientes: Cliente[] = [];
  public usuarios: Usuario[] = [];

  // Contador nuevo
  public contadorNuevo: Contador = {
    counter_port_wwa: 3001,
    client_id: 1,
    user_id: 1,
  };

  // Modificar contador
  public contadorModificadoId = 0;
  public contadorModificado: Contador = {
    counter_port_wwa: 3001,
    client_id: 1,
    user_id: 1,
  };

  constructor(
    private apiContador: ContadorService,
    private apiCliente: ClienteService,
    private apiUsuario: UsuarioService,
    private subnavbar: SubNavBarService,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subnavbar.setTitulo('Contadores');
    this.obtenerContadores();
    this.obtenerClientes();
    this.obtenerUsuarios();
  }

  obtenerContadores() {
    this.apiContador.getContador<Contador[]>('counters').subscribe((result) => {
      console.log('contadores', result);
      this.contadores = result;
    });
  }

  obtenerClientes() {
    this.apiCliente.getCliente<Cliente[]>('clients').subscribe((result) => {
      this.clientes = result;
    });
  }

  obtenerUsuarios() {
    this.apiUsuario.getUsuario<Usuario[]>('users').subscribe((result) => {
      this.usuarios = result;
    });
  }

  openModal() {
    console.log('open modal');

    const modalElement = this.el.nativeElement.querySelector('#contadorModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  crearContador() {
    console.log(this.contadorNuevo);

    this.apiContador
      .postContador<Contador>('counters', this.contadorNuevo)
      .subscribe((result) => {
        console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success('Contador creado correctamente', 'Enviapy Alert');
          this.obtenerContadores();
          this.contadorNuevo = {
            counter_port_wwa: 3001,
            client_id: 1,
            user_id: 1,
          };
        } else {
          this.toastr.error(
            'Error al intentar registrar el usuario',
            'Enviapy Alert'
          );
        }
      });
  }

  modificarContador(contador: Contador) {
    console.log('contador a modificar', contador);
    this.contadorModificadoId = contador.counter_id!;

    this.contadorModificado = {
      counter_port_wwa: contador.counter_port_wwa,
      counter_web_url: contador.counter_web_url,
      counter_wwa_url: contador.counter_wwa_url,

      client_id: contador.client_id,
      user_id: contador.user_id,
    };
  }

  guardarCambios() {
    console.log(this.contadorModificado);
    this.apiContador
      .patchContador(
        'counters/' + this.contadorModificadoId,
        this.contadorModificado
      )
      .subscribe((result) => {
        // console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success('Contador modificado correctamente', 'Enviapy Alert');
          this.obtenerContadores();
          this.contadorNuevo = {
            counter_port_wwa: 3001,
            client_id: 1,
            user_id: 1,
          };
        } else {
          this.toastr.error(
            'Error al intentar registrar el usuario',
            'Enviapy Alert'
          );
        }
      });
  }

  cambiarEstado(idContador: number, status: number) {
    this.contadorModificado.counter_status = status;

    console.log(this.contadorModificado)

    this.apiContador.patchContador('counters/' + idContador, this.contadorModificado)
      .subscribe((result) => {
        console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success('Contador modificado correctamente', 'Enviapy Alert');
          this.obtenerContadores();
          this.contadorNuevo = {
            counter_port_wwa: 3001,
            client_id: 1,
            user_id: 1,
          };
        } else {
          this.toastr.error(
            'Error al intentar registrar el usuario',
            'Enviapy Alert'
          );
        }

      })
  }
}
