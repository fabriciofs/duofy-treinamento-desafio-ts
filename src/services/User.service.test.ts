import { UserEntity } from "../entities/User.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { UserService } from "./User.service";

describe('User.service.ts', () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService({} as HttpRequestAbstract<UserEntity | UserEntity[]>);
  });

  test('should be defined', () => {
    expect(userService).toBeInstanceOf(CrudService);
    expect(userService.URL).toBe('users');
  });
});