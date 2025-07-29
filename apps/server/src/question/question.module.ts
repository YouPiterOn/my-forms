import { Module } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";

@Module({
  providers: [QuestionRepository, QuestionService],
  exports: [
    QuestionService,
    QuestionRepository
  ]
})
export class QuestionModule {}