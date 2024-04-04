import { UserEntity } from "../entities/User.entity";
import { CrudService, extraProcessingOperations } from "../helpers/CrudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class UserService extends CrudService<UserEntity> {
  constructor(httpRequest: HttpRequestAbstract<UserEntity>) {
    super(httpRequest, 'user')
  }

  extraProcessing(entity: Partial<UserEntity>, operation: extraProcessingOperations, id?: string | undefined): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}