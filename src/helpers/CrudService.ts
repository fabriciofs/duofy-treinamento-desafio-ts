import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export enum extraProcessingOperations {
  CREATING = 'CREATING',
  UPDATING = 'UPDATING',
  REMOVING = 'REMOVING',
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  REMOVED = 'REMOVED',
}


export abstract class CrudService<T> {
  constructor(
    private readonly httpRequest: HttpRequestAbstract<T>,
    private readonly endPoint: string,
  ) {
  }

  get _endPoint(): string {
    return this.endPoint;
  }

  async create(body: T): Promise<T> {
    let payload = body;
    if (await this.hasExtraProcessing()) {
      payload = await this.extraProcessing(body, extraProcessingOperations.CREATING);
    }
    return this.httpRequest.post(this.endPoint, payload);
  }

  async update(id: string, body: Partial<T>): Promise<void> {
    let payload = body;
    if (await this.hasExtraProcessing()) {
      payload = await this.extraProcessing(body, extraProcessingOperations.UPDATING, id);
    }
    return this.httpRequest.put(`${this.endPoint}/${id}`, payload);
  }

  async delete(id: string): Promise<void> {
    return this.httpRequest.delete(`${this.endPoint}/${id}`);
  }

  async getById(id: string): Promise<T> {
    return this.httpRequest.get(`${this.endPoint}/${id}`) as Promise<T>;
  }

  async getMany(filter?: string): Promise<T[]> {
    if (filter) {
      return this.httpRequest.get(`${this.endPoint}?${filter}`) as Promise<T[]>;
    }
    return this.httpRequest.get(this.endPoint) as Promise<T[]>;
  }

  abstract extraProcessing(
    entity?: Partial<T>,
    operation?: extraProcessingOperations,
    id?: string): Promise<T>

  async hasExtraProcessing(): Promise<boolean> {
    try {
      await this.extraProcessing();
      return true;
    } catch (error) {
      return false;
    }
  }
}