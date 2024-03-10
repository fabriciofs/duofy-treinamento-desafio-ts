import { TransactionEntity } from "../entities/Transaction.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class TransactionService extends CrudService<TransactionEntity | TransactionEntity[]> {
  constructor(httpRequest: HttpRequestAbstract<TransactionEntity | TransactionEntity[]>) {
    super(httpRequest, 'transactions');
  }
}