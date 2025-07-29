import { QuestionType } from "src/gen/graphql.generated";

interface CreateFormQuestionDto {
  type: QuestionType;
  label: string;
  description?: string | null;
  required: boolean;
  order: number;
  options?: string[] | null;
  placeholder?: string | null;
  minDate?: string | null;
  maxDate?: string | null;
}

export interface CreateFormDto {
  title: string;
  description?: string | null;
  questions: CreateFormQuestionDto[];
}