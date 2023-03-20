import { Quiz } from "./quizz.models";

export interface Theme {
    id: String;
    name: String;
    quizzes?: Quiz[];
}
