import { TransactionEntity } from "../entities/Transaction.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { TransactionService } from "./Transaction.service";

describe('Transaction.service.ts', () => {
  let transactionService: TransactionService;
  beforeEach(() => {
    transactionService = new TransactionService({} as HttpRequestAbstract<TransactionEntity | TransactionEntity[]>);
  });

  test('should be defined', () => {
    expect(transactionService).toBeInstanceOf(CrudService);
    expect(transactionService.URL).toBe('transactions');
  });
});