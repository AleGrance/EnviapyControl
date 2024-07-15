import { Usuario } from './usuario';

export interface CreateUserResult {
  status: string;
  body: Usuario;
}
