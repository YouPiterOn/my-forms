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

  findByIds(ids: string[]): Map<string, QuestionEntity> {
    const idsSet = new Set(ids);
    const questionsMap = new Map<string, QuestionEntity>();

    for (const question of this.items.values()) {
      if(questionsMap.has(question.id)) continue;

      if (idsSet.has(question.id)) {
        questionsMap.set(question.id, question);
      }
    }

    return questionsMap;
  }
}