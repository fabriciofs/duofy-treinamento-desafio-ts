import { BankEntity } from "./Bank.entity";
import { CategoryEntity } from "./Category.entity";
import { UserEntity } from "./User.entity";

export class TransactionEntity {
  id?: string = "";
  date: Date = new Date();
  amount: number = 0;
  description: string = "";
  user: UserEntity = new UserEntity();
  bank: BankEntity = new BankEntity();
  category: CategoryEntity = new CategoryEntity();
}