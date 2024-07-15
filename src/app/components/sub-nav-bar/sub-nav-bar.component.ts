import { Component, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubNavBarService } from '../../services';
import { Titles } from '../../common';

@Component({
  selector: 'app-sub-nav-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sub-nav-bar.component.html',
  styleUrl: './sub-nav-bar.component.scss',
})
export class SubNavBarComponent implements OnInit {
  public title: string = 'Titulo';

  public contadorOpenModal = output();
  public clienteOpenModal = output();
  public usuarioOpenModal = output();

  btnContadores = false;
  btnClientes = false;
  btnUsuarios = false;

  constructor(private subNavService: SubNavBarService) {}

  ngOnInit(): void {
    this.subNavService.getTitulo.subscribe((result: string) => {
      this.title = result;
    });

    if (this.title == Titles.CONTADORES) {
      this.btnContadores = true;
      this.btnClientes = false;
      this.btnUsuarios = false;
    }

    if (this.title == Titles.CLIENTES) {
      this.btnContadores = false;
      this.btnClientes = true;
      this.btnUsuarios = false;
    }

    if (this.title == Titles.USUARIOS) {
      this.btnContadores = false;
      this.btnClientes = false;
      this.btnUsuarios = true;
    }
  }

  // emitir evento
  emitContador() {
    this.contadorOpenModal.emit();
  }

  emitCliente() {
    this.clienteOpenModal.emit();
  }

  emitUsuario() {
    this.usuarioOpenModal.emit();
  }
}
