import { Module } from "@nestjs/common";
import { ResponseRepository } from "./response.repository";
import { ResponseService } from "./response.service";
import { ResponseResolver } from "./response.resolver";
import { AnswerModule } from "src/answer/answer.module";
import { FormModule } from "src/form/form.module";
import { QuestionModule } from "src/question/question.module";

@Module({
  imports: [
    AnswerModule,
    FormModule,
    QuestionModule
  ],
  providers: [
    ResponseRepository,
    ResponseService,
    ResponseResolver
  ]
})
export class ResponseModule {}