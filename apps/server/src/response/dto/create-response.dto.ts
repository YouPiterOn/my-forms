export interface CreateResponseAnswerDto {
  questionId: string;
  value?: string | null;
  values?: string[] | null;
}

export interface CreateResponseDto {
  formId: string;
  answers: CreateResponseAnswerDto[]
}