import { UserEntity } from "./User.entity";

export class DefaultEntity {
  id?: string = "";
  user: UserEntity = new UserEntity();
}