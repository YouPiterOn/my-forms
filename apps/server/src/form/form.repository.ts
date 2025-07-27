import { InMemoryRepository } from "src/common/in-memory.repository";
import { FormEntity } from "./entity/form.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FormRepository extends InMemoryRepository<FormEntity> {}