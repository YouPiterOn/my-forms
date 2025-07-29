import { BaseEntity } from "src/common/in-memory.repository";

export interface ResponseEntity extends BaseEntity {
  id: string;
  formId: string;
  createdAt: string;
  updatedAt: string;
}