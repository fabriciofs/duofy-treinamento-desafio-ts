import { UserEntity } from "./User.entity";

export class BaseEntity {
  id?: string = "";
  user?: UserEntity = new UserEntity();
}