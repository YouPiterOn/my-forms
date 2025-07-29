import { Module } from "@nestjs/common";
import { AnswerRepository } from "./answer.repository";
import { AnswerService } from "./answer.service";
import { AnswerResolver } from "./answer.resolver";
import { QuestionModule } from "src/question/question.module";

@Module({
  imports: [
    QuestionModule
  ],
  providers: [
    AnswerRepository,
    AnswerService,
    AnswerResolver
  ],
  exports: [
    AnswerRepository,
    AnswerService
  ]
})
export class AnswerModule {}