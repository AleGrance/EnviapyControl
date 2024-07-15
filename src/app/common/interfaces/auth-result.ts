export interface AuthResult {
  token: string;
  user_fullname: string;
  user_id: number;
  role_id: number;
  auth: boolean;
  error?: {
    message: string;
  };
}
