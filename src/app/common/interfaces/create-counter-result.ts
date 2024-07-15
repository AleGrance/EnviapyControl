import { Contador } from './contador';

export interface CreateCounterResult {
  status: string;
  body?: Contador;
}
