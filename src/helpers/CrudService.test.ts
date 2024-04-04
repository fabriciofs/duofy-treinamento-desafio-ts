import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { CrudService, extraProcessingOperations } from "./CrudService"

class HttpRequesMock<T> extends HttpRequestAbstract<T> {
  async get(url: string): Promise<T | T[]> {
    return []
  }
  async post(url: any, body: T): Promise<T> {
    return body
  }
  async put(url: string, body: Partial<T>): Promise<void> {
    return
  }
  async delete(url: string): Promise<void> {
    return
  }
}

class TestEntity {
  id?: string = "";
}

class TestService extends CrudService<TestEntity> {
  constructor(httpRequest: HttpRequestAbstract<TestEntity>) {
    super(httpRequest, 'test')
  }

  extraProcessing(entity: Partial<TestEntity>, operation: extraProcessingOperations, id?: string | undefined): Promise<TestEntity> {
    throw new Error("Method not implemented.")
  }
}


describe('CrudService.ts', () => {
  let httpRequest: HttpRequestAbstract<TestEntity>
  let testService: TestService
  beforeEach(() => {
    jest.clearAllMocks();
    httpRequest = new HttpRequesMock<TestEntity>("http://localhost:3000")
    jest.spyOn(httpRequest, 'get');
    jest.spyOn(httpRequest, 'post');
    jest.spyOn(httpRequest, 'put');
    jest.spyOn(httpRequest, 'delete');
    testService = new TestService(httpRequest)
  });
  test('deve ser instanciado', () => {
    expect(testService).toBeInstanceOf(TestService)
  })
  test('deve chamar o método create', async () => {
    const test = new TestEntity()
    await testService.create(test)
    expect(httpRequest.post).toHaveBeenCalledTimes(1);
    expect(httpRequest.post).toHaveBeenCalledWith('test', test);
  })
  test('deve chamar o método update', async () => {
    const test = new TestEntity()
    await testService.update('1', test)
    expect(httpRequest.put).toHaveBeenCalledTimes(1);
    expect(httpRequest.put).toHaveBeenCalledWith('test/1', test);
  })
  test('deve chamar o método delete', async () => {
    await testService.delete('1')
    expect(httpRequest.delete).toHaveBeenCalledTimes(1);
    expect(httpRequest.delete).toHaveBeenCalledWith('test/1');
  })
  test('deve chamar o método getById', async () => {
    await testService.getById('1')
    expect(httpRequest.get).toHaveBeenCalledTimes(1);
    expect(httpRequest.get).toHaveBeenCalledWith('test/1');
  })
  test('deve chamar o método getMany', async () => {
    await testService.getMany()
    expect(httpRequest.get).toHaveBeenCalledTimes(1);
    expect(httpRequest.get).toHaveBeenCalledWith('test');
  })
  test('deve chamar o método getMany with filter', async () => {
    await testService.getMany("xyz=1")
    expect(httpRequest.get).toHaveBeenCalledTimes(1);
    expect(httpRequest.get).toHaveBeenCalledWith('test?xyz=1');
  })
})