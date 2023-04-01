import {Question} from "./question.models";

export interface Quiz {
  id: string;
  name: string;
  // theme?: string;
  questions: Question[];
}

