import { BaseEntity } from "src/common/in-memory.repository";
import { QuestionType } from "../enum/question-type.enum";

export interface QuestionEntity extends BaseEntity {
  id: string;
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

  createdAt: string;
  updatedAt: string;
}