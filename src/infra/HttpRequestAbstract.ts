export abstract class HttpRequestAbstract<T> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract get(url: string): Promise<T | T[]>;
  abstract post(url: any, body: T): Promise<T>;
  abstract put(url: string, body: Partial<T>): Promise<void>;
  abstract delete(url: string): Promise<void>;
}