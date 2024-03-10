import { UserEntity } from "../entities/User.entity";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export abstract class CrudService<T> {
  constructor(
    private readonly httpRequest: HttpRequestAbstract<T | T[]>,
    private readonly url: string) {
    this.httpRequest = httpRequest;
    this.url = url;
  }

  get URL(): string {
    return this.url;
  }

  async create(entity: T): Promise<T> {
    return this.httpRequest.post(this.url, entity) as Promise<T>;
  }

  async update(id: string, entity: T): Promise<void> {
    return this.httpRequest.put(`${this.url}/${id}`, entity);
  }

  async delete(id: string,): Promise<void> {
    return this.httpRequest.delete(`${this.url}/${id}`);
  }

  async getById(id: string): Promise<T> {
    return this.httpRequest.get(`${this.url}/${id}`) as Promise<T>;
  }

  async getMany(filter?: string): Promise<T[]> {
    if (filter) {
      return this.httpRequest.get(`${this.url}?${filter}`) as Promise<T[]>;
    }
    return this.httpRequest.get(`${this.url}`) as Promise<T[]>;
  }
}