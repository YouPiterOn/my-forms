import { Module } from "@nestjs/common";
import { AnswerRepository } from "./answer.repository";
import { AnswerService } from "./answer.service";

@Module({
  providers: [
    AnswerRepository,
    AnswerService,
  ],
  exports: [
    AnswerRepository,
    AnswerService
  ]
})
export class AnswerModule {}