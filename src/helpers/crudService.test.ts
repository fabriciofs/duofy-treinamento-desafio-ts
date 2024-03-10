import { UserEntity } from "../entities/User.entity";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { CrudService } from "./crudService";

class MockHttpRequest<T> implements HttpRequestAbstract<T | T[]> {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async post(url: string, data: any): Promise<any> {
    return Promise.resolve(data);
  }

  async put(url: string, data: any): Promise<any> {
    return Promise.resolve(data);
  }

  async delete(url: string): Promise<void> {
    return Promise.resolve();
  }

  async get(url: string): Promise<any> {
    return Promise.resolve([]);
  }
}

const user = new UserEntity();
user.id = '1';
user.name = 'User 1';

class Entity {
  id: string = '';
  name: string = '';
  user: UserEntity = user;
}

let mockHttpRequest = new MockHttpRequest<Entity>('http://localhost:3000');

class EntityService extends CrudService<Entity> {
  constructor() {
    super(mockHttpRequest, 'entity');
  }
}

describe('crudService.ts', () => {
  let entityService: EntityService;
  let entity: Entity;
  beforeEach(() => {
    jest.clearAllMocks();
    entity = { id: '1', name: 'Entity 1', user };
    jest.spyOn(mockHttpRequest, 'post');
    jest.spyOn(mockHttpRequest, 'put');
    jest.spyOn(mockHttpRequest, 'delete');
    jest.spyOn(mockHttpRequest, 'get');
  });

  it('should create an entity', async () => {
    entityService = new EntityService();
    await entityService.create(entity);
    expect(mockHttpRequest.post).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.post).toHaveBeenCalledWith('entity', entity);
  });

  it('should update an entity', async () => {
    const entityId = '1';
    await entityService.update(entityId, entity);
    expect(mockHttpRequest.put).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.put).toHaveBeenCalledWith('entity/1', entity);
  });

  it('should delete an entity', async () => {
    const entityId = '1';
    await entityService.delete(entityId);
    expect(mockHttpRequest.delete).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.delete).toHaveBeenCalledWith('entity/1');
  });

  it('should get an entity by id', async () => {
    const entityId = '1';
    await entityService.getById(entityId);
    expect(mockHttpRequest.get).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.get).toHaveBeenCalledWith('entity/1');
  });

  it('should get all entities without filter', async () => {
    await entityService.getMany();
    expect(mockHttpRequest.get).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.get).toHaveBeenCalledWith("entity");
  });

  it('should get all entities with filter', async () => {
    await entityService.getMany("user=1");
    expect(mockHttpRequest.get).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest.get).toHaveBeenCalledWith("entity?user=1");
  });

  it('should get URL', () => {
    expect(entityService.URL).toBe('entity');
  });
});

