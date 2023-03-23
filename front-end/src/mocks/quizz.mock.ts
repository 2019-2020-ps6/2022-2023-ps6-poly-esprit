import { Questions } from './question.mock';
export const Quizz = [
  {
    id: '1',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [],
  },
  {
    id: '2',
    name: 'Les technos WEB',
    questions: [Questions[1]],
  },
  {
    id: '3',
    name: 'La révolution française',
    theme: 'Histoire',
    questions: [Questions[0]],
  }
];
