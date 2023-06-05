export interface User {
  id: string;
  isAdmin: boolean;
  nom: string;
  prenom: string;
  age: number;
  sex: string;
  pathology?: number;
  path_pp: string;
  need_big_button: boolean;
  need_big_text: boolean;
}
