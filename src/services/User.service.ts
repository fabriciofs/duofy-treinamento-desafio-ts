import { UserEntity } from "../entities/User.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class UserService extends CrudService<UserEntity | UserEntity[]> {
  constructor(httpRequest: HttpRequestAbstract<UserEntity | UserEntity[]>) {
    super(httpRequest, 'users');
  }
}