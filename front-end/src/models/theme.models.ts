import { Quiz } from "./quizz.models";

export interface Theme {
    id: number;
    name: String;
    quizzes?: Quiz[];
}
