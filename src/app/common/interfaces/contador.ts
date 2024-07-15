import { Cliente } from "./cliente";
import { Usuario } from "./usuario";

export interface Contador {
  counter_id?: number;
  counter_port_wwa: number;
  counter_date?: Date;
  counter_sent?: number;
  counter_status?: number;
  counter_wwa_url?: string;
  counter_web_url?: string;
  client_id: number;
  user_id: number;
  Client?: Cliente;
  User?: Usuario;
}
