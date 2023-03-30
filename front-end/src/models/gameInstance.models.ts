import { Question, Answer } from './question.models';

export interface GameInstance {
  Id: string;
  quizId:string;
  gameQuestionsAnswers: GameQuestionAnswer[];
  startTime: Date;
  endTime: Date;
  score: number;
}

export interface GameQuestionAnswer {
  startDate: Date;
  submissionDate: Date;
  questionValue: string;  // or question: Question to keep the question and answers given even if the question or answers are updated later
  answerValue: string; // or answers: Answers[]
  isCorrect: boolean;
}


