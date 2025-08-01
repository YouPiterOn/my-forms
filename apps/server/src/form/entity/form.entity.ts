import { BaseEntity } from "src/common/in-memory.repository";

export interface FormEntity extends BaseEntity {
  id: string;
  title: string;
  description?: string | null;

  createdAt: string;
  updatedAt: string;
}