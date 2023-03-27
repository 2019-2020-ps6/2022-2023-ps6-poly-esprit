import {QuizStat} from "./quiz-stat.model";

export interface Stats {
  id: number;
  user: String; //de type User quand implémenté
  quizStats: QuizStat[];
}
