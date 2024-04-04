import { BankEntity } from "./Bank.entity";
import { CategoryEntity } from "./Category.entity";
import { DefaultEntity } from "./Default.entity";

export class TransactionEntity extends DefaultEntity {
  date: Date = new Date();
  description: string = "";
  value: number = 0;
  category: CategoryEntity = new CategoryEntity();
  bank: BankEntity = new BankEntity();
}