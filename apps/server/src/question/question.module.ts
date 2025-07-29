import { Module } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";
import { QuestionDataLoader } from "./dataloader/question.dataloader";

@Module({
  providers: [QuestionRepository, QuestionService, QuestionDataLoader],
  exports: [
    QuestionService,
    QuestionRepository,
    QuestionDataLoader,
  ]
})
export class QuestionModule {}