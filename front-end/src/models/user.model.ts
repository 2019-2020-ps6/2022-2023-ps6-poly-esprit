export interface User {
  [x: string]: any;
  id: string;
  isAdmin: boolean;
  nom: string;
  prenom: string;
  age: number;
  sex: string;
  pathology?: number;
  path_pp: string;
}
