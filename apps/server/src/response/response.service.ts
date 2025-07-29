import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ResponseRepository } from "./response.repository";
import { ResponseDto } from "./dto/response.dto";
import { ResponseEntity } from "./entity/response.entity";
import { ResponseFiltersDto } from "./dto/response-filters.dto";
import { Page } from "src/common/types/page.types";
import { AnswerRepository } from "src/answer/answer.repository";
import { FormRepository } from "src/form/form.repository";
import { QuestionRepository } from "src/question/question.repository";
import { CreateResponseAnswerDto, CreateResponseDto } from "./dto/create-response.dto";
import { QuestionEntity } from "src/question/entity/question.entity";
import { AnswerDto } from "src/answer/dto/answer.dto";

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly formRepository: FormRepository,
    private readonly questionRepository: QuestionRepository
  ) { }

  private validateAnswers(questions: QuestionEntity[], answers: CreateResponseAnswerDto[]): boolean {
    const questionIds = new Set(questions.map(q => q.id));

    const answerCounts = new Map<string, number>();

    for (const answer of answers) {
      const qid = answer.questionId;

      if (!questionIds.has(qid)) return false; // answer to unknown question

      answerCounts.set(qid, (answerCounts.get(qid) ?? 0) + 1);

      if (answerCounts.get(qid)! > 1) return false; // duplicate answer
    }

    for (const question of questions) {
      if (question.required && !answerCounts.has(question.id)) return false; // missing required answer
    }

    return true;
  }

  create(dto: CreateResponseDto): ResponseEntity {
    const form = this.formRepository.getById(dto.formId);
    if (!form) throw new NotFoundException('Form not found');

    const questions = this.questionRepository.getAllByFormId(form.id)

    if(!this.validateAnswers(questions, dto.answers)) throw new BadRequestException('Invalid Answers');

    const response = this.responseRepository.create(dto);

    for(const answer of dto.answers) {
      this.answerRepository.create({ responseId: response.id, ...answer });
    }

    return response;
  }

  getById(id: string): ResponseEntity | undefined {
    return this.responseRepository.getById(id);
  }

  getPage(
    page = 0,
    pageSize = 10,
    filters: ResponseFiltersDto = {}
  ): Page<ResponseEntity> {
    return this.responseRepository.getPage(page, pageSize, filters);
  }

  update(id: string, dto: ResponseDto): ResponseEntity {
    return this.responseRepository.update(id, dto);
  }

  delete(id: string): boolean {
    return this.responseRepository.delete(id);
  }

  clear(): void {
    this.responseRepository.clear();
  }
}
