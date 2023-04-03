import {User} from "../models/user.model";

export const mockUser: User[] = [
  {
    id: '0',
    isAdmin: true,
    nom: "Martin",
    prenom: "Micheline",
    age: 35,
    sex: "Male",
    pathology: 0
  },
  {
    id: '1',
    isAdmin: false,
    nom: "Janeau",
    prenom: "Patrick",
    age: 75,
    sex: "Male",
    pathology: 1
  },
  {
    id: '2',
    isAdmin: false,
    nom: "Dupont",
    prenom: "Jean-Marc",
    age: 87,
    sex: "Male",
    pathology: 2
  },
  {
    id: '3',
    isAdmin: false,
    nom: "Luckas",
    prenom: "Yvette",
    age: 73,
    sex: 'Female',
    pathology: 4
  }
];
