import { UserEntity } from "./User.entity";

export class BankEntity {
  id?: string = "";
  name: string = "";
  user: UserEntity = new UserEntity();
}