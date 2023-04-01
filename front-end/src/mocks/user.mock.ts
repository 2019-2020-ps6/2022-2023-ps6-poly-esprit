import {User} from "../models/user.model";

export const mockUser: User[] = [
  {
    id: '0',
    isAdmin: false,
    nom: "Dupont",
    prenom: "Jean",
    age: 35,
    sex: "Male",
    pathology: 2
  },
  {
    id: '1',
    isAdmin: true,
    nom: "Beurel",
    prenom: "Simon",
    age: 21,
    sex: "Male",
    pathology: 0
  },
  {
    id: '2',
    isAdmin: false,
    nom: "Maurois",
    prenom: "Quentin",
    age: 85,
    sex: "Male",
    pathology: 1
  },
  {
    id: '3',
    isAdmin: false,
    nom: "Thea",
    prenom: "Delias",
    age: 95,
    sex: 'Female',
    pathology: 4
  }
];
