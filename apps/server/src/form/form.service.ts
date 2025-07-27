import { Injectable } from "@nestjs/common";
import { FormRepository } from "./form.repository";
import { FormDto } from "./dto/form.dto";
import { FormEntity } from "./entity/form.entity";
import { dateNow, generateId } from "src/common/utils/repository.utils";
import { Page } from "src/common/types/page.types";

@Injectable()
export class FormService {
  constructor(
    private readonly formRepository: FormRepository
  ) {}

  create(dto: FormDto): FormEntity {
    const id = generateId();
    const date = dateNow();

    const question: FormEntity = {
      ...dto,
      id: id,
      createdAt: date,
      updatedAt: date,
    };
    return this.formRepository.create(question);
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
    const updated = {
      ...dto,
      updatedAt: dateNow(),
    };
    return this.formRepository.update(id, updated);
  }

  delete(id: string): boolean {
    return this.formRepository.delete(id);
  }

  clear(): void {
    this.formRepository.clear();
  }
}