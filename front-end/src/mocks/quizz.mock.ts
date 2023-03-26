import { Question } from './question.mock';
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
    theme: 'Technologie',
    questions: [],
  },
  {
    id: '2',
    name: 'La révolition française',
    theme: 'Histoire',
    questions: [Question[0]],
  }
];
