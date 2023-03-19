import { Question, Answer } from './question.models';

export interface GameInstance {
  Id: string;
  quizId:string;
  gameQuestionsAnswers: GameQuestionAnswer[ ];
  startTime: Date;
  endTime: Date;
}

export interface GameQuestionAnswer {
  startDate: Date;
  submissionDate: Date;
  questionId: Question;  // or question: Question to keep the question and answers given even if the question or answers are updated later
  answerIds: Answer[]; // or answers: Answers[]
}


