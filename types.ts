
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  cardType: 'Prata' | 'Ouro' | 'Diamante';
  expiryDate: string;
  birthDate: string; 
  status: 'Ativo' | 'Inativo';
  isValidated: boolean; // Novo: controla se o e-mail foi verificado
  password?: string;    // Novo: senha de acesso
}

export interface Benefit {
  id: string;
  title: string;
  category: string;
  discount: string;
  description: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
  currentUser: User | null;
}
