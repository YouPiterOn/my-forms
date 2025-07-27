import { Page } from "./types/page.types";

type ID = string;

export class InMemoryRepository<T extends { id: ID }, F extends Partial<Record<keyof T, unknown>> = Partial<T>> {
  private items = new Map<ID, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    this.items.set(item.id, item);
    return item;
  }

  getById(id: ID): T | undefined {
    return this.items.get(id);
  }

  getMany(ids: ID[]): Map<ID, T> {
    const idsSet = new Set(ids);
    const entitiesMap = new Map<ID, T>();

    for (const author of this.items.values()) {
      if (entitiesMap.has(author.id)) continue;

      if (idsSet.has(author.id)) {
        entitiesMap.set(author.id, author);
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


  update(id: ID, updateData: Partial<Omit<T, "id">>): T {
    const item = this.items.get(id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    const updated = { ...item, ...updateData };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: ID): boolean {
    return this.items.delete(id);
  }

  clear() {
    this.items.clear();
  }
}
