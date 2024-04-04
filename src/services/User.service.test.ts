import { UserEntity } from "../entities/User.entity"
import { CrudService } from "../helpers/CrudService"
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { UserService } from "./User.service"

describe('User.service.ts', () => {
  let userService: UserService
  beforeEach(() => {
    userService = new UserService({} as HttpRequestAbstract<UserEntity>)
  });
  test('deve ser instanciado', () => {
    expect(userService).toBeInstanceOf(UserService);
    expect(userService).toBeInstanceOf(CrudService);
    expect(userService._endPoint).toBe('user');
  })
  test('não deve chamar o método extraProcessing', async () => {
    expect(await userService.hasExtraProcessing()).toBe(false);
  })
})
