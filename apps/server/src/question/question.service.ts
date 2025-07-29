import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionEntity } from './entity/question.entity';
import { QuestionDto } from './dto/question.dto';
import { Page } from 'src/common/types/page.types';
import { QuestionFiltersDto } from './dto/question-filters.dto';
import { dateNow, generateId } from 'src/common/utils/repository.utils';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository
  ) { }

  create(dto: QuestionDto): QuestionEntity {
    return this.questionRepository.create(dto);
  }

  getById(id: string): QuestionEntity | undefined {
    return this.questionRepository.getById(id);
  }

  getPage(
    page = 0,
    pageSize = 10,
    filters: QuestionFiltersDto = {}
  ): Page<QuestionEntity> {
    return this.questionRepository.getPage(page, pageSize, filters);
  }

  getAllByFormId(formId: string): QuestionEntity[] {
    return this.questionRepository.getAllByFormId(formId);
  }

  update(id: string, dto: QuestionDto): QuestionEntity {
    return this.questionRepository.update(id, dto);
  }

  delete(id: string): boolean {
    return this.questionRepository.delete(id);
  }

  clear(): void {
    this.questionRepository.clear();
  }
}