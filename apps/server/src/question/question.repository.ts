import { InMemoryRepository } from "src/common/in-memory.repository";
import { QuestionEntity } from "./entity/question.entity";
import { Injectable } from "@nestjs/common";
import { QuestionFiltersDto } from "./dto/question-filters.dto";

@Injectable()
export class QuestionRepository extends InMemoryRepository<QuestionEntity, QuestionFiltersDto> {
  getAllByFormId(formId: string) {
    const allItems = Array.from(this.items.values());

    return allItems.filter((item) => item.formId === formId);
  }
}