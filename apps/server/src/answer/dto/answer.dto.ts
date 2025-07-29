export interface AnswerDto {
  responseId: string;
  questionId: string;
  value?: string | null;
  values?: string[] | null;
}