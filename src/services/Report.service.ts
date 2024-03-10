import { BankEntity } from "../entities/Bank.entity";
import { CategoryEntity } from "../entities/Category.entity";
import { CategoryTypeEnum } from "../entities/CategoryType.enum";
import { TransactionEntity } from "../entities/Transaction.entity";
import { UserEntity } from "../entities/User.entity";
import { dateToCharacter } from "../helpers/dateToCharacter";
import { round } from "../helpers/round";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { TransactionService } from "./Transaction.service";


export type BankStatementType = {
  date: string;
  description: string;
  type: CategoryTypeEnum;
  categoryName: string;
  amount: number;
  balance: number;
};

export type IncomeAndExpensesByCategoryType = {
  category: CategoryEntity;
  income: number;
  expenses: number;
}

export class ReportService {
  httpRequest: HttpRequestAbstract<TransactionEntity[]>;

  constructor(httpRequest: HttpRequestAbstract<TransactionEntity[]>) {
    this.httpRequest = httpRequest;
  }

  async bankStatement(bank: BankEntity, startDate: Date, endDate: Date): Promise<BankStatementType[]> {
    const transactionService = new TransactionService(this.httpRequest);
    const transactions = await transactionService.getMany(`bank=${bank.id}&date_lte=${endDate.toISOString()}`) as TransactionEntity[];
    const transactionsBeforeStartDate = transactions.filter(transaction => transaction.date < startDate);
    const openingBalance = transactionsBeforeStartDate.reduce((acc, transaction) =>
      acc + round(transaction.amount * (transaction.category.type === CategoryTypeEnum.INCOME ? 1 : -1), 2)
      , 0);
    const bankStatement = transactions
      .filter(transaction => transaction.date >= startDate && transaction.date <= endDate)
      .reduce((acc, transaction) => {
        const balance = acc[acc.length - 1].balance;
        acc.push({
          date: dateToCharacter(transaction.date),
          description: transaction.description,
          type: transaction.category.type,
          categoryName: transaction.category.name,
          amount: transaction.amount,
          balance: balance + round(transaction.amount * (transaction.category.type === CategoryTypeEnum.INCOME ? 1 : -1), 2)
        });
        return acc;
      }, [{
        date: dateToCharacter(startDate),
        description: 'Saldo Inicial',
        type: CategoryTypeEnum.INCOME,
        categoryName: '',
        amount: openingBalance,
        balance: openingBalance
      }])

    return bankStatement;
  }

  async incomeAndExpenseByCategory(user: UserEntity, startDate: Date, endDate: Date): Promise<IncomeAndExpensesByCategoryType[]> {
    const transactionService = new TransactionService(this.httpRequest);
    const transactions = await transactionService.getMany(`user=${user.id}&date_gte=${startDate.toISOString()}&date_lte=${endDate.toISOString()}`) as TransactionEntity[];

    if (!transactions || transactions.length === 0) {
      return []
    }
    const initialValue: IncomeAndExpensesByCategoryType[] = [];
    return transactions.reduce((acc, transaction) => {
      const index = acc.findIndex(item => item.category === transaction.category)
      if (index >= 0) {
        if (transaction.category.type == CategoryTypeEnum.INCOME) {
          acc[index].income += transaction.amount
        } else {
          acc[index].expenses += transaction.amount
        }
      } else {
        const item: IncomeAndExpensesByCategoryType = {
          category: transaction.category,
          income: 0,
          expenses: 0
        }
        if (transaction.category.type == CategoryTypeEnum.INCOME) {
          item.income += transaction.amount
        } else {
          item.expenses += transaction.amount
        }
        acc.push(item)
      }
      return acc
    }, initialValue);
  }
}