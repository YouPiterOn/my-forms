import { InMemoryRepository } from "src/common/in-memory.repository";
import { QuestionEntity } from "./entity/question.entity";
import { Injectable } from "@nestjs/common";
import { QuestionFiltersDto } from "./dto/question-filters.dto";

@Injectable()
export class QuestionRepository extends InMemoryRepository<QuestionEntity, QuestionFiltersDto> {}