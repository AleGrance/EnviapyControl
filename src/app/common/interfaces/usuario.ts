export interface Usuario {
  user_id?: number;
  user_name: string;
  user_fullname: string;
  user_password?: string;
  user_email: string;
  role_id: number;
  Role?: {
    role_name: string;
  };
}
