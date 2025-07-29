import { Module } from "@nestjs/common";
import { QuestionModule } from "src/question/question.module";
import { FormResolver } from "./form.resolver";
import { FormService } from "./form.service";
import { FormRepository } from "./form.repository";

@Module({
  imports: [QuestionModule],
  providers: [
    FormRepository,
    FormService,
    FormResolver
  ],
  exports: [
    FormRepository,
    FormService
  ]
})
export class FormModule {}