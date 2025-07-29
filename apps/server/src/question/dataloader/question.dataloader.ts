import DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { QuestionEntity } from "../entity/question.entity";
import { QuestionRepository } from "../question.repository";

@Injectable({ scope: Scope.REQUEST })
export class QuestionDataLoader extends DataLoader<string, QuestionEntity> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(async (questionIds: string[]) => {
      const questionsMap = this.questionRepository.findByIds(questionIds);

      return questionIds.map((id) => {
        const question = questionsMap.get(id);
        if (!question) {
          throw new Error('Question not found');
        }
        return question;
      });
    });
  }
}