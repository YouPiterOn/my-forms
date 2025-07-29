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
    const id = generateId();
    const date = dateNow();

    const question: QuestionEntity = {
      ...dto,
      id: id,
      createdAt: date,
      updatedAt: date,
    };
    return this.questionRepository.create(question);
  }

  createMany(dtos: QuestionDto[]) {
    const date = dateNow();

    for (const dto of dtos) {
      const id = generateId();
      
      const question: QuestionEntity = {
        ...dto,
        id: id,
        createdAt: date,
        updatedAt: date,
      };
      this.questionRepository.create(question)
    }
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

  update(id: string, dto: QuestionDto): QuestionEntity {
    const updated = {
      ...dto,
      updatedAt: dateNow(),
    };
    return this.questionRepository.update(id, updated);
  }

  delete(id: string): boolean {
    return this.questionRepository.delete(id);
  }

  clear(): void {
    this.questionRepository.clear();
  }
}