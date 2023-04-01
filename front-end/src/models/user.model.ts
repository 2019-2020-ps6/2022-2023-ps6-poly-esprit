export interface User {
  id: string;
  isAdmin: boolean;
  nom: string;
  prenom: string;
  age: number;
  sex: string;
  pathology?: number;
}
