import { BankEntity } from "./Bank.entity";
import { BaseEntity } from "./Base.entity";
import { CategoryEntity } from "./Category.entity";

export class TransactionEntity extends BaseEntity {
  date: Date = new Date();
  amount: number = 0;
  description: string = "";
  bank: BankEntity = new BankEntity();
  category: CategoryEntity = new CategoryEntity();
}