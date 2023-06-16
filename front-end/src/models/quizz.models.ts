import {Question} from "./question.models";

export interface Quiz {
  id: string;
  name: string;
  questions?: Question[];
}

