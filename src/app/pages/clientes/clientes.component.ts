import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService, SubNavBarService } from '../../services';
import { Cliente, ResponseStatus } from '../../common';
import { SubNavBarComponent } from '../../components';

import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [SubNavBarComponent, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = [];

  // Cliente nuevo
  public clienteNuevo: Cliente = {
    client_name: '',
    client_ruc: '',
    client_email: '',
    client_phone: '',
  };

  constructor(
    private apiCliente: ClienteService,
    private subnavbar: SubNavBarService,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subnavbar.setTitulo('Clientes');
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.apiCliente.getCliente<Cliente[]>('clients').subscribe((result) => {
      console.log('clientes', result);
      this.clientes = result;
    });
  }

  openModal() {
    console.log('open modal');
    
    const modalElement = this.el.nativeElement.querySelector('#clienteModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  crearCliente() {
    console.log(this.clienteNuevo);

    this.apiCliente
      .postCliente<Cliente>('clients', this.clienteNuevo)
      .subscribe((result) => {
        console.log(result);

        if (result.status == ResponseStatus.SUCCESS) {
          this.toastr.success('Cliente creado correctamente', 'Enviapy Alert');
          this.obtenerClientes();
          this.clienteNuevo = {
            client_name: '',
            client_ruc: '',
            client_email: '',
            client_phone: '',
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
