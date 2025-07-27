import { QuestionType } from "../enum/question-type.enum";

export interface QuestionDto {
  formId: string;
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