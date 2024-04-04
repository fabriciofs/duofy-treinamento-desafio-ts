import { BankEntity } from "../entities/Bank.entity";
import { CategoryType } from "../entities/Category.entity";
import { TransactionEntity } from "../entities/Transaction.entity";
import { dateToCharacter } from "../helpers/dateToCharacter";
import { round } from "../helpers/round";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { TransactionService } from "./Transaction.service";

export type BankStatementType = {
  date: string;
  description: string;
  type: CategoryType;
  categoryName: string;
  amount: number;
  balance: number;
}


export class ReportService {

  constructor(private readonly httpRequest: HttpRequestAbstract<TransactionEntity>) { }

  async bankStatement(bank: BankEntity, startDate: Date, endDate: Date): Promise<BankStatementType[]> {
    const transactionService = new TransactionService(this.httpRequest)
    const transactions = await transactionService.getMany(`bank=${bank.id}&date_lte=${endDate.toISOString()}`);
    const openingBalance = transactions
      .filter(transaction => transaction.date < startDate)
      .reduce((acc, transaction) => acc + round(transaction.value * (transaction.category.type === CategoryType.INCOME ? 1 : -1), 2), 0);

    const bankStatement = transactions
      .filter(transaction => transaction.date >= startDate)
      .reduce((acc, transaction) => {
        const date = dateToCharacter(transaction.date);
        const balance = acc[acc.length - 1].balance + round(transaction.value * (transaction.category.type === CategoryType.INCOME ? 1 : -1), 2);
        acc.push({
          date,
          description: transaction.description,
          type: transaction.category.type,
          categoryName: transaction.category.name,
          amount: transaction.value,
          balance
        } as BankStatementType)
        return acc
      }, [
        {
          date: dateToCharacter(startDate),
          description: "Saldo Inicial",
          type: openingBalance >= 0 ? CategoryType.INCOME : CategoryType.EXPENSE,
          categoryName: '',
          amount: openingBalance,
          balance: openingBalance
        } as BankStatementType
      ]);
    return bankStatement;
  }
}

