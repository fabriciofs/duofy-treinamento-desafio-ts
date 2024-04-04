import { HttpRequestAbstract } from "./HttpRequestAbstract";

export class HttpRequestFetch<T> extends HttpRequestAbstract<T> {
  get(url: string): Promise<T | T[]> {
    throw new Error("Method not implemented.");
  }
  post(url: any, body: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  put(url: string, body: Partial<T>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(url: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}