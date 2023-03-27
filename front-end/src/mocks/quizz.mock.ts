import {Questions} from "./question.mock";

export const Quizz = [
  {
    id: '0',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [],
  },
  {
    id: '1',
    name: 'Les technos WEB',
    questions: [],
  },
  {
    id: '2',
    name: 'La révolition française',
    theme: 'Histoire',
    questions: [Questions[0], Questions[1]]
  }
];
