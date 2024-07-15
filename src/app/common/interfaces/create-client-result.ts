import { Cliente } from './cliente';

export interface CreateClientResult {
  status: string;
  body: Cliente;
}
