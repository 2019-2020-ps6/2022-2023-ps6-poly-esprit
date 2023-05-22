export interface Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
  questionId: string;
  id: string;
}

export interface Question {
  id: string;
  quizId: string;
  label: string;
  answers: Answer[];
}

