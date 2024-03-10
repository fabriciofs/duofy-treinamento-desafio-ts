import { BankEntity } from "../entities/Bank.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class BankService extends CrudService<BankEntity | BankEntity[]> {
  constructor(httpRequest: HttpRequestAbstract<BankEntity | BankEntity[]>) {
    super(httpRequest, 'banks');
  }
}