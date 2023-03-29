import {Questions} from "./question.mock";

export const Quizz = [
  {
    id: '0',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [Questions[3], Questions[4]]
  },
  {
    id: '1',
    name: 'Les technos WEB',
    questions: [Questions[5], Questions[6]],
  },
  {
    id: '2',
    name: 'La révolition française',
    theme: 'Histoire',
    questions: [Questions[0], Questions[1], Questions[2]]
  }

];
