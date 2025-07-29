import { Injectable } from "@nestjs/common";
import { AnswerRepository } from "./answer.repository";
import { AnswerEntity } from "./entity/answer.entity";
import { Page } from "src/common/types/page.types";
import { AnswerFiltersDto } from "./dto/answer-filters.dto";
import { dateNow, generateId } from "src/common/utils/repository.utils";
import { AnswerDto } from "./dto/answer.dto";

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerRepository
  ) {}

  create(dto: AnswerDto): AnswerEntity {
    return this.answerRepository.create(dto);
  }

  getById(id: string): AnswerEntity | undefined {
    return this.answerRepository.getById(id);
  }

  getPage(
    page = 0,
    pageSize = 10,
    filters: AnswerFiltersDto = {}
  ): Page<AnswerEntity> {
    return this.answerRepository.getPage(page, pageSize, filters);
  }

  getAllByResponseId(responseId: string) {
    return this.answerRepository.getAllByResponseId(responseId);
  }

  update(id: string, dto: AnswerDto): AnswerEntity {
    return this.answerRepository.update(id, dto);
  }

  delete(id: string): boolean {
    return this.answerRepository.delete(id);
  }

  clear(): void {
    this.answerRepository.clear();
  }
}
