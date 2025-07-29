import { Injectable } from "@nestjs/common";
import { FormRepository } from "./form.repository";
import { FormDto } from "./dto/form.dto";
import { FormEntity } from "./entity/form.entity";
import { dateNow, generateId } from "src/common/utils/repository.utils";
import { Page } from "src/common/types/page.types";
import { CreateFormDto } from "./dto/create-form.dto";
import { QuestionRepository } from "src/question/question.repository";

@Injectable()
export class FormService {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly questionRepository: QuestionRepository
  ) {}

  create(dto: CreateFormDto): FormEntity {
    const form = this.formRepository.create(dto);
    for(const question of dto.questions) {
      this.questionRepository.create({ formId: form.id, ...question })
    }

    return form;
  }

  getById(id: string): FormEntity | undefined {
    return this.formRepository.getById(id);
  }

  getPage(
    page = 0,
    pageSize = 10
  ): Page<FormEntity> {
    return this.formRepository.getPage(page, pageSize, {});
  }

  update(id: string, dto: FormDto): FormEntity {
    return this.formRepository.update(id, dto);
  }

  delete(id: string): boolean {
    return this.formRepository.delete(id);
  }

  clear(): void {
    this.formRepository.clear();
  }
}