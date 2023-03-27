import {User} from "../models/user.model";

export const mockUser: User[] = [
  {
    isAdmin: false,
    nom: "Dupont",
    prenom: "Jean",
    age: 35,
    sex: "Male",
    pathology: 2
  },
  {
    isAdmin: true,
    nom: "Beurel",
    prenom: "Simon",
    age: 21,
    sex: "Male",
    pathology: 0
  }
];
