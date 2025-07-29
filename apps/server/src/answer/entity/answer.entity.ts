import { BaseEntity } from "src/common/in-memory.repository";

export interface AnswerEntity extends BaseEntity {
  id: string;
  responseId: string;
  questionId: string;
  value?: string | null;
  values?: string[] | null;
  createdAt: string;
  updatedAt: string;
}