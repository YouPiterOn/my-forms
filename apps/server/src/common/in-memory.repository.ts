import { Page } from "./types/page.types";
import { dateNow, generateId } from "./utils/repository.utils";

type ID = string;

export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export class InMemoryRepository<
  T extends BaseEntity,
  F extends Partial<Record<keyof T, unknown>> = Partial<T>,
  C = Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
> {
  protected items = new Map<ID, T>();

  create(data: C): T {
    const id = generateId();
    const now = dateNow();

    const item = {
      id,
      createdAt: now,
      updatedAt: now,
      ...data,
    } as unknown as T;

    this.items.set(id, item);
    return item;
  }

  getById(id: ID): T | undefined {
    return this.items.get(id);
  }

  getMany(ids: ID[]): Map<ID, T> {
    const idsSet = new Set(ids);
    const entitiesMap = new Map<ID, T>();

    for (const item of this.items.values()) {
      if (idsSet.has(item.id)) {
        entitiesMap.set(item.id, item);
      }
    }

    return entitiesMap;
  }

  getPage(page: number = 0, pageSize: number = 10, filters: F = {} as F): Page<T> {
    const allItems = Array.from(this.items.values());

    const filtered = allItems.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return (item as any)[key] === value;
      });
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const start = page * pageSize;
    const end = start + pageSize;

    return {
      data: filtered.slice(start, end),
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }

  update(id: ID, updateData: Partial<C>): T {
    const existing = this.items.get(id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }

    const updated: T = {
      ...existing,
      ...updateData,
      updatedAt: dateNow(),
    };

    this.items.set(id, updated);
    return updated;
  }

  delete(id: ID): boolean {
    return this.items.delete(id);
  }

  clear(): void {
    this.items.clear();
  }
}
