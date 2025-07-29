import { InMemoryRepository } from "src/common/in-memory.repository";
import { AnswerEntity } from "./entity/answer.entity";
import { AnswerFiltersDto } from "./dto/answer-filters.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerRepository extends InMemoryRepository<AnswerEntity, AnswerFiltersDto> {
  getAllByResponseId(responseId: string) {
    const allItems = Array.from(this.items.values());

    return allItems.filter((item) => item.responseId === responseId);
  }
}