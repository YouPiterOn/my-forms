import { Injectable } from "@nestjs/common";
import { InMemoryRepository } from "src/common/in-memory.repository";
import { ResponseEntity } from "./entity/response.entity";
import { ResponseFiltersDto } from "./dto/response-filters.dto";

@Injectable()
export class ResponseRepository extends InMemoryRepository<ResponseEntity, ResponseFiltersDto> {} 